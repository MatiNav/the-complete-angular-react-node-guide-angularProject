import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms/src/model';


@Injectable()
export class FormMethodsService {

    isInvalidInputOfFormGroup(form: FormGroup, field: string) {
        return form.controls[field].invalid &&
            (form.controls[field].dirty || form.controls[field].touched)
    }

    isRequiredInputOfFormGroup(form: FormGroup, field: string){
        return form.controls[field].errors.required        
    }
    
    isPatternInputOfFormGroup(form: FormGroup, field: string){
        return form.controls[field].errors.pattern        
    }

    isInvalidInput(field) {
        return field.invalid && (field.dirty ||field.touched)
    }


    isRequiredInput(field) {
        return field.errors.required
    }
}
