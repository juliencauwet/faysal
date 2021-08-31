import { Component, OnInit } from '@angular/core';
import { ExcelService } from './services/excel/excel.service';
import {FormBuilder} from "@angular/forms";
import {Dechet} from "./model/dechet.model";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  target: DataTransfer | undefined;
  importDechets: Dechet[] = [];
  exportDechets: Dechet[] = [];
  data: any[] | undefined;
  reader = new FileReader();
  selectedItems: Dechet[] = [];
  annees : number[] = [];
  anneesString : string[] = [];
  sites: string[] = ['Site A', 'Site B', 'Site C', 'Site D' ]
  raisons: string[] = ['Raison Sociale 1', 'Raison Sociale 2', 'Raison Sociale 3', 'Raison Sociale 4']
  firstLoad: boolean = true;

  tgwForm = this.fb.group({
    raison:[''],
    site: [''],
    annee: [''],
    mois: [''],
  });

  constructor(private excelSrv: ExcelService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    for (let i = 2022; i > 2006; i--) {
      this.annees.push(i);
      this.anneesString.push(i.toString());
    }
  }

  onFileChange(evt: any) {
    console.log('onFileChange')
    this.target = <DataTransfer>(evt.target);
    if (this.target.files.length !== 1) throw new Error('Cannot use multiple files');
    if (this.firstLoad)
      this.loadTable();
    else
      this.firstLoad = false;
  }

  loadTable(){

    this.reader.onload = (e: any) => {

      const bstr: string = e.target.result;

      this.data = <Dechet[]>this.excelSrv.importFromFile(bstr);
      console.log(this.data);

      const headers: string[] = Object.getOwnPropertyNames(new Dechet());
      console.log(headers);
      const importedData = this.data.slice(1, -1);

      this.importDechets = importedData.map(arr => {
        const obj: any = {};
        for (let i = 0; i < headers.length; i++) {
          const k = headers[i];
          obj[k] = arr[i];
        }
        return <Dechet>obj;
      })

    };
    this.reader.readAsBinaryString(this.target!.files[0]);

  }

  exportData(tableId: string) {
    this.excelSrv.exportToFile("dechets", tableId);
  }

  actualiser(){
    console.log('actualiser')
    this.loadTable();
    console.log(this.tgwForm.get('raison')!.value);
    console.log(this.tgwForm.get('site')!.value);
    console.log(this.tgwForm.get('annee')!.value);
    console.log(this.tgwForm.get('mois')!.value);
    this.importDechets.forEach(e => console.log(e.RS_client == this.tgwForm.get('raison')!.value, ' ', e.RS_client!.length, ' ', this.tgwForm.get('raison')!.value.length) );
    this.importDechets = this.importDechets
      .filter(e => e.Annee == this.tgwForm.get('annee')!.value)
      .filter(e => e.Site == this.tgwForm.get('site')!.value)
      .filter(e => e.Mois == this.tgwForm.get('mois')!.value)
      .filter(e => e.RS_client == this.tgwForm.get('raison')!.value)

  }

}
