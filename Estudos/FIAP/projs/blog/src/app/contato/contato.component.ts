import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})



export class ContatoComponent implements OnInit {

  falha = { sucesso: false, texto: 'Problemas no envio do formulário de contato!' };
  contatoForm: FormGroup;
  listaErros = [];
  listaResultado = [];
  mensagensErro = {
    'nome': { 'required': 'favor preencher o  nome' }
    , 'email': {
      'required': 'favor preencher o email',
      'emailIsValid': 'o formato do email preenchido está incorireto'
    }
    , 'texto': {
      'required': 'favor preencher o texto', 'minlength': 'você precisa informar um texto com no mínimo 5 carecteres'
      , 'maxlength': 'o limite do texto é de 100 caracteres'
    }
  };

  constructor(private fb: FormBuilder) { }
  ngOnInit() { this.buidForm(); }

  buidForm() {
    this.contatoForm = this.fb.group({
      'nome': ['', [Validators.required]],
      'email': ['', [Validators.required]],
      'text': ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]]
    });

    this.contatoForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();

    onValueChanged(data?:any){
      if(!this.contatoForm)return;
      this.listaErros=[];
      for(const field in this.contatoForm.controls){
        var control = this.contatoForm.get(field);
        if(control && control.dirty && !control.valid){
          for(const error in control.errors){
            this.listaErros.push({sucesso:false, texto: this.mensagensErro[field][error]});
          }
        }
      }
    
  }


}


