import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  setDoc,
  deleteDoc
} from '@angular/fire/firestore';

import { Produto } from '../models/products.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private firestore = inject(Firestore);
  private productsCollection = collection(this.firestore, 'productsGlobal');

  /** LISTAR TODOS OS PRODUTOS */
  getProducts(): Observable<Produto[]> {
    return collectionData(this.productsCollection, { idField: 'id' }).pipe(
      map(products => products as Produto[])
    );
  }

  /** OBTER PRODUTO POR ID */
  getProductById(id: string): Observable<Produto | undefined> {
    const productDoc = doc(this.firestore, `productsGlobal/${id}`);
    return docData(productDoc, { idField: 'id' }).pipe(
      map(product => product as Produto | undefined)
    );
  }

  /** CRIAR PRODUTO */
  async createProduct(product: Produto): Promise<void> {
    const { id, ...data } = product;

    const sanitizedName = product.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9_-]/g, '_')
      .replace(/_{2,}/g, '_')
      .replace(/^_+|_+$/g, '');

    if (!sanitizedName) {
      throw new Error('O nome do produto é inválido para gerar o ID');
    }

    const productDocRef = doc(this.productsCollection, sanitizedName);
    await setDoc(productDocRef, data);
  }

  /** DELETAR PRODUTO */
  async deleteProduct(id: string): Promise<void> {
    const productDoc = doc(this.firestore, `productsGlobal/${id}`);
    return deleteDoc(productDoc);
  }
}

