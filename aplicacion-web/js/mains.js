window.addEventListener('load',function(){

      fetch('api/info-musica.json')
      .then(res => res.json())
      .then(res=>{

        let html ='';
        for (x of res) {
          html += `
          
          <div class="pt-2 mx-0 px-3 mb-5" id="${ x.id }">
              <div class="pt-3 mb-3">
                  <div class="card">
                      <img src="img/${ x.imagen }" class="card-img-top" width="200" height="200">
                      <div class="card-body">
                        <h5 class="card-title text-center">${ x.cancion }</h5>
                        <p class="card-text text-center">${ x.autor }</p>
                          <audio controls muted class="container">
                              <source src="musica/${ x.tema }"> 
                          </audio>
                      </div>
                  </div>
              </div>
          </div>
        
          `;
        }
         
        document.getElementById('music-list').innerHTML = html;
        
      })

  if('serviceWorker' in navigator){
    
    navigator.serviceWorker
        
      .register('sw.js')
      .then(res => console.log('Service Worker registrado.' ,res))
      .catch(err => console.log('Service Worker registrado.' ,err))

  }

  console.log(Notification.permission);

  if(window.Notification && Notification.permission !== 'denied') {

    setTimeout(function () {
  
      Notification.requestPermission()
           
          .then(permission => {
  
            console.log(permission);

            if(permission === 'granted') {

                console.log('Acepto,realizo la suscripción al servidor');

            }else{

              console.log('No acepto,no hago nada');


            }
  
          }  )
          
    }, 10000);
  
  }

  let OnlineStatus = () => {

    console.log(navigator.onLine);

    if(navigator.onLine){

      document.getElementById('header-principal').style.backgroundColor = '#8b0000';

    }else{

      document.getElementById('header-principal').style.backgroundColor = '#000000';

    }


  }


  OnlineStatus();

  window.addEventListener('online', OnlineStatus);
  window.addEventListener('offline', OnlineStatus);


  let eventInstall;
  let divInstall = document.querySelector('.install-app');

  let = InstallApp = ()=> {
  
     if (eventInstall) {
       eventInstall.prompt();
       eventInstall.userChoice
        .then(res => {

            if (res.outcome =='accepted') {
              console.log('El usuario acepto instalar la app');
              divInstall.style.display = 'none';
            }
            else {
              console.log('El usuario acepto instalar la app');
            }
            
        })
      }
  }


  let ShowInstallButton = () => {


    if(divInstall!=undefined) {

      divInstall.style.display = 'flex';

      divInstall.addEventListener('click', InstallApp);

    }

  }

  window.addEventListener('beforeinstallprompt', e =>{

   e.preventDefault();
   eventInstall = e;
   ShowInstallButton();


  })
  

  let shareApp = document.querySelectorAll('.share-app');

  if(shareApp != undefined) {

    if (navigator.share) { 

      for (let i=0;i<shareApp.length;i++){

        shareApp[i].addEventListener('click',function (e) {

          navigator.share({

            title: 'App Música',
            text:  'En esta app encontraras las mejores canciones para escuchar que desees',
            url: 'http://localhost/aplicacion-web/'

          })

          .then(res => {

          })

          .catch(err => {
 
            console.log(err);

          })  

        })

      }
    }

  }else{ 

    for(let i=0;i<shareApp.length;i++){

      shareApp[i].style.display ='none';

    }
  }

})
