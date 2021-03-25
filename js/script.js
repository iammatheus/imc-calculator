const input = document.querySelectorAll('[data-js]')
const headerResult = document.querySelector('.header-results')
const result = document.querySelector('.resultIMC')
const classificacao = document.querySelector('.classificacao')
const resultAll = document.querySelector('.statics')

const masks = {
   kg(value){
      return value
      .replace(/(\D)/g, '')
      .replace(/(\d{2,3})(\d{3})/, '$1.$2')
   },
   height(value){
      return value
      .replace(/\D/g, '')
      .replace(/(\d)(\d{2})/, '$1.$2')
   },
   age(value){
      return value
      .replace(/\D/g, '')
   }
}

function removeAllClass(){
   resultAll.classList.remove('lowIMC')
   resultAll.classList.remove('idealIMC')
   resultAll.classList.remove('excessIMC')
   resultAll.classList.remove('obesityIMC')
   resultAll.classList.remove('darkBlueColor')
}
function addClass(params){
   resultAll.classList.add(params)
}

function cleanResult(){
   headerResult.style.display = 'none'
   classificacao.innerHTML = ''
}


input.forEach($input => {
   const field = $input.dataset.js

   $input.addEventListener('input', (e) => {
      e.target.value = masks[field](e.target.value)
   }, false)
})

function resultIMC(){
   
   let age = document.querySelector('[data-js=age]').value
   let height = document.querySelector('[data-js=height]')
   let kg = document.querySelector('[data-js=kg]')
   let imc = (kg.value / (height.value * height.value)).toFixed(2)

   headerResult.style.display = 'block'
   removeAllClass()
      
   for(let i=0; i < input.length; i++){
      let inputValue = input[i].value
      
      
      //IMC - Adultos
      if(age <= 12){

         addClass('darkBlueColor')
         cleanResult()
         result.innerHTML = 'Informe uma idade maior que 12'
         
      }else if(height.value <= 00){

         addClass('darkBlueColor')
         cleanResult()
         result.innerHTML = 'Informe uma altura válida'

      }else if(kg.value <= 0){

         addClass('darkBlueColor')
         cleanResult()
         result.innerHTML = 'Informe um peso válido'

      }else if(inputValue != '' && age <= 60 && imc < 18.5){

         addClass('lowIMC')
         classificacao.innerHTML = `Classificação: Baixo peso`;
         result.innerHTML = `IMC: ${imc}`;
         
      }else if(inputValue != '' && age <= 60 && imc <= 24.9){

         addClass('idealIMC')
         classificacao.innerHTML = `Classificação: Peso normal`;
         result.innerHTML = `IMC: ${imc}`;

      }else if(inputValue != '' && age <= 60 && imc <= 29.9){

         addClass('excessIMC')
         classificacao.innerHTML = `Classificação: Excesso de peso`;
         result.innerHTML = `IMC: ${imc}`;

      }else if(inputValue != '' && age <= 60 && imc <= 34.9){

         addClass('obesityIMC')
         classificacao.innerHTML = `Classificação: Obesidade classe 1`;
         result.innerHTML = `IMC: ${imc}`;

      }else if(inputValue != '' && age <= 60 && imc <= 39.9){

         addClass('obesityIMC')
         classificacao.innerHTML = `Classificação: Obesidade classe 2`;
         result.innerHTML = `IMC: ${imc}`;

      }else if(inputValue != '' && age <= 60 && imc >= 40){

         addClass('obesityIMC')
         classificacao.innerHTML = `Classificação: Obesidade classe 3`;
         result.innerHTML = `IMC: ${imc}`;

      }
      
      //IMC - Idosos
      if(inputValue != '' && age > 60 && imc <= 22){

         addClass('lowIMC')
         classificacao.innerHTML = `Classificação: Baixo peso`;
         result.innerHTML = `IMC: ${imc}`;
         
      }else if(inputValue != '' && age > 60 && imc < 27){

         addClass('idealIMC')
         classificacao.innerHTML = `Classificação: Adequado ou eutrófico`;
         result.innerHTML = `IMC: ${imc}`;

      }else if(inputValue != '' && age > 60 && imc >= 27){

         addClass('obesityIMC')
         classificacao.innerHTML = `Classificação: Sobrepeso`;
         result.innerHTML = `IMC: ${imc}`;

      }else if(inputValue == ''){

         cleanResult()
         addClass('darkBlueColor')
         result.innerHTML = 'Preencha todos os campos para obter o IMC!'
         break

      }
   }
}


// IMC - Jovens/Adultos
// <18,5 = Baixo peso
// 18,5 a 24,9 = Peso normal
// 25,0 a 29,9 = Excesso de peso
// 30,0 a 34,9 = Obesidade de Classe 1
// 35,0 a 39,9 = Obesidade de Classe 2
// ≥ 40,0 = Obesidade de Classe 3

// IMC - Idosos
// ≤ 22 = Baixo peso
// > 22 e < 27 = Adequado ou eutrófico
// ≥ 27 = Sobrepeso
