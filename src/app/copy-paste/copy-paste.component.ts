import { Component } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-copy-paste',
  templateUrl: './copy-paste.component.html',
  styleUrl: './copy-paste.component.css'
})
export class CopyPasteComponent {

  datos: any = undefined;
  datosCompra: any = undefined;
  datosVenta: any = undefined;
  dataTEF: any = undefined;
  voucherCompra: any = undefined;
  voucherVenta: any = undefined;
  dataCsv: any = undefined;
  newData: any[] = []; // Your new data to insert

  constructor(private _clipboard: Clipboard, private http: HttpClient) {
  }

  validateRut(data: any) {
    data.rut = data.rut.replace('.', ''); // Remove dots
    if (!data.rut.includes('-')) { // Add hyphen if missing
      data.rut = data.rut.slice(0, -1) + '-' + data.rut.slice(-1);
    }
    return data;
  }

  validateAccountNumber(data: any) {
    if (data.bank?.toLowerCase().includes('estado')) { // Check for Banco Estado
      if (data.accountNumber?.endsWith('-') || data.accountNumber === data.rut?.replace('-', '')) {
        data.accountNumber = data.accountNumber.slice(0, -1); // Remove trailing hyphen if matches rut
      }
    }

    if (data.bank?.toLowerCase().includes('santander')) { // Check for Banco Santander
      data.accountNumber = data.accountNumber.replace('-', '').replace('.', ''); // Remove all separators
    } else {
      data.accountNumber = data.accountNumber.replace('-', '').replace(' ', '').replace('.', ''); // Remove all separators except hyphen
    }
    return data;
  }

  validateAccountType(data: any) {
    if (['rut', 'cuenta rut', 'cuentarut'].includes(data.accountType?.toLowerCase())) {
      data.accountType = 'Cuenta Vista'; // Map "rut" type to "Cuenta Vista"
    }

    if (['vista', 'corriente'].includes(data.accountType?.toLowerCase())) {
      data.accountType = `cuenta ${data.accountType}`; // Prepend "cuenta " to "vista" and "corriente"
    }

    data.accountType = data.accountType?.charAt(0).toUpperCase() + data.accountType?.slice(1).toLowerCase(); // Title case the account type

    return data;
  }

  validateBank(data: any) {
    if (data.bank === 'Banco Santander Chile') {
      data.bank = 'Banco Santander';
    }

    if (data.bank === 'BCI Chile') {
      data.bank = 'Banco BCI';
    }

    return data;
  }

  getBankData(fileData: string[]) {
    const indexes: number[] = [];
    let data: any = {}; // Create copy to avoid mutating original data

    if (fileData[0].toLowerCase().includes('santander')) {
      indexes.push(0, 8, 6, 4, 10, 12);
    } else if (fileData[0].toLowerCase().includes('falabella')) {
      indexes.push(0, 2, 4, 6, 8, 10);
    } else if (fileData[0].toLowerCase().includes('estado')) {
      indexes.push(0, 8, 6, 4, 10, 12);
    } else if (fileData[0].toLowerCase().includes('bci')) {
      indexes.push(0, 8, 4, 6, 10, 2);
    } else if (fileData[0].toLowerCase().includes('chile')) {
      indexes.push(0, 8, 6, 4, 10, 12);
    }

    if (indexes.length) {
      data['bank'] = fileData[indexes[0]];
      data = this.validateBank(data); // Assuming validateBank is a separate function
      data['rut'] = fileData[indexes[1]];
      data = this.validateRut(data); // Assuming validateRut is a separate function
      data['accountNumber'] = fileData[indexes[2]];
      data = this.validateAccountNumber(data); // Assuming validateAccountNumber is a separate function
      data['accountType'] = fileData[indexes[3]];
      data = this.validateAccountType(data); // Assuming validateAccountType is a separate function
      data['email'] = fileData[indexes[4]];
      data['name'] = fileData[indexes[5]];
    }

    return data;
  }

  splitStringByLineBreaks(text: string): string[] {
    // Replace multiple consecutive line breaks with a single one
    const trimmedText = text.trim(); // Trim leading and trailing whitespace
    const lines = trimmedText.replace(/\n\n+/g, '\n').split('\n');
    return lines;
  }

  getData(text: string) {
    return this.getBankData(this.splitStringByLineBreaks(text));
  }

  copyToClipboard() {
    const formatData: any = this.getData(this.datos)
    const copyData = `Nombre: ${formatData.name}\nRUT: ${formatData.rut}\n${formatData.bank}\n${formatData.accountType}\nNumero cuenta: ${formatData.accountNumber}\nEmail: ${formatData.email}`
    this.dataTEF = formatData;
    this._clipboard.copy(copyData);
    this.voucherCompra = undefined;
    this.voucherVenta = undefined;
  }

}