import { Injectable } from '@nestjs/common';
import * as faceapi from '@vladmandic/face-api/dist/face-api.node.js';
import * as tf from '@tensorflow/tfjs-node';
import * as fs from 'fs';
import { PhotoDataDto } from '../photos/dto/photo-data.dto';
import { getAllFilesFromDirectory, getFilePath } from '../../utils/files';
import { Multer } from 'multer';
import { PhotosService } from '../photos/photos.service';
import { ImageSimilarityDto } from '../photos/dto/image-similarity.dto';
import { sortByField } from '../../utils/helpers';

const WEIGHTS_PATH = './src/detector/weights';

// todo: https://petec0x0.medium.com/how-to-compare-two-faces-for-similarity-using-face-api-js-in-reactjs-e9344010dd89
@Injectable()
export class DetectorService {
  constructor(private photosService: PhotosService) {}

  optionsSSDMobileNet: faceapi.FaceDetectionOptions;

  readFile(filePath): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, (error, stats) => {
        if (error) {
          reject(error);
        } else {
          resolve(new Uint8Array(stats));
        }
      });
    });
  }

  async loadModels() {
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(WEIGHTS_PATH);
    await faceapi.nets.faceRecognitionNet.loadFromDisk(WEIGHTS_PATH);
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(WEIGHTS_PATH);
  }

  async getTensorFromPath(imagePath): Promise<tf.Tensor4D> {
    const file = await this.readFile(imagePath);
    const decoded: tf.Tensor4D = <tf.Tensor4D>tf.node.decodeImage(file);
    return decoded.toFloat();
  }
  async getTensorFromFile(file: Express.Multer.File): Promise<tf.Tensor4D> {
    const decoded: tf.Tensor4D = <tf.Tensor4D>tf.node.decodeImage(file.buffer);
    return decoded.toFloat();
  }

  async compareFaces(tensor1: tf.Tensor4D, tensor2: tf.Tensor4D) {
    await this.loadModels();

    this.optionsSSDMobileNet = new faceapi.SsdMobilenetv1Options({
      minConfidence: 0.5,
    });

    // Вычисление дескрипторов лиц
    // @ts-ignore
    const descriptor1 = await faceapi.computeFaceDescriptor(tensor1);
    // @ts-ignore
    const descriptor2 = await faceapi.computeFaceDescriptor(tensor2);

    // Сравнение дескрипторов лиц
    const distance = faceapi.euclideanDistance(
      descriptor1 as Float32Array,
      descriptor2 as Float32Array,
    );

    // Определение, насколько лица похожи
    const similarity = 1 - distance;

    // Освобождение памяти
    tensor1.dispose();
    tensor2.dispose();

    return similarity;
  }

  async compareFacesTest(): Promise<number> {
    return this.compareFaces(
      await this.getTensorFromPath('photos\\\\photo_2023-06-05_22-05-46.jpg'),
      await this.getTensorFromPath('photos\\\\photo_2023-06-05_22-06-50.jpg'),
    );
  }

  async detect(tensor: faceapi.TNetInput) {
    return faceapi.detectAllFaces(tensor, this.optionsSSDMobileNet);
  }

  async detectFace(tensor: tf.Tensor4D) {
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(WEIGHTS_PATH);
    this.optionsSSDMobileNet = new faceapi.SsdMobilenetv1Options({
      minConfidence: 0.5,
    });

    // @ts-ignore
    const result = await this.detect(tensor);

    tensor.dispose();

    return result;
  }
  async detectFaceTest() {
    return this.detectFace(
      await this.getTensorFromPath('photos\\\\photo_2023-06-05_22-05-46.jpg'),
    );
  }

  async getSimilarityImages(image: Express.Multer.File) {
    const filesPath = getAllFilesFromDirectory('photos');

    const resultImages: ImageSimilarityDto[] = [];

    for (const imageName of filesPath) {
      const imagePath = getFilePath('photos', imageName);
      const tensor1 = await this.getTensorFromPath(imagePath);
      const tensor2 = await this.getTensorFromFile(image);
      const similarity = await this.compareFaces(tensor1, tensor2);

      if (similarity > 0.5) {
        resultImages.push({ similarity, imageName });
      }
    }

    return resultImages;
  }

  async getDataByFace(image: Express.Multer.File): Promise<PhotoDataDto> {
    const similarImages: ImageSimilarityDto[] = await this.getSimilarityImages(
      image,
    );

    const mostSimilar = sortByField(similarImages, 'similarity', 'desc')[0];

    const photo = await this.photosService.getOneByName(mostSimilar.imageName);

    return photo.data;
  }
}
