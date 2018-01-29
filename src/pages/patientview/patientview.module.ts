import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientviewPage } from './patientview';

@NgModule({
  declarations: [
    PatientviewPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientviewPage),
  ],
})
export class PatientviewPageModule {}
