$(Document_Loaded);

var title = "ChatYS 2.0"; // Site Başlığı
var sunucu = "http://localhost:3000"; // Sunucu adresi
var socket = null;

function Document_Loaded()
{    
    BootstrapFuncs();
    ClientEvents();
    
}
function ClientEvents()
{
    $("title,#title").html(title);

    $("#themelist a").click(function(e){
        e.preventDefault();       
        $("#bootheme").attr("href",$(this).attr("href"));
    });

    $("#txtNick").keydown(function(e){         
        if(e.keyCode == 13) {  
            if($(this).val() !== "")
            {
                $(this).popover('hide');
                
                $(".progress").show();
                socket = io.connect(sunucu);
                
                $("#txtNick").hide();  
                socket.emit('Giris', $(this).val());       
                $("#txtMsj").show(); 
                
                SocketEvents();                
               
            }
            else
            {
                $(this).popover('show');
            }
        }
    });
    
    $("#txtMsj").keydown(function(e){         
        if(e.keyCode == 13) {               
            var msj = $(this).val();
            if(msj === '/temizle'){ // Buradan herkesin kullanabileceği komutlar ekleyebilirsiniz.
                $("#cikti").html("");                
            }else
            {
                $(".progress").show();                
                socket.emit('MsjGonder', msj);
            }
            
            $(this).val("");  
           
            
        }
    }); 
   
    $(window).focus(function () {
        document.title = title;
        hasFocus = true; 
    });
    window.onblur = function () {      
        hasFocus = false;        
    };
}  

function SocketEvents(){
    
    socket.on('Giris',function(data){ // Kişi sayfaya nickini yazıp girdiğinde..             
        $("#cikti").prepend("<b style='color:"+data.kisi.renk+"'>"+data.kisi.nick+" has connected.</b><hr>");           
        
        $("#kisisayisi").html(data.kisisayisi);
        $("#bilgiler").show();
        $(".progress").hide();
    });
    
    socket.on('MsjGoster', function (data) { // Herhangi bir kişi mesaj gönderirse..       
        if(!hasFocus  && !titleCurrentlyChanging)
        {       
            changeTitle();
        }
        
        $("#cikti").prepend("<b style='color:"+data.kisi.renk+"'>"+data.kisi.nick +"</b> : "+ data.msj +"<hr>");   
        $(".progress").hide();
        
       
    });
    
    socket.on('Cikis', function (data) { // Kişi sayfadan ayrıldığında çalışacak olay.
        $("#kisisayisi").html(parseInt($("#kisisayisi").html())-1);
        $("#cikti").prepend("<b style='color:"+data.kisi.renk+"'>"+data.kisi.nick+" has disconnected.</b><hr>");  
        
    });
}
function BootstrapFuncs(){
    $("#txtNick").popover({content : "* Where are you going without enter the nick ?", placement : "top",trigger:"manual"});    
}

var hasFocus = true;
var titleCurrentlyChanging = false;
var i = 0;

function changeTitle() {
    i++;
    if(i%2) {
        document.title = 'New message !';
    }
    else {
        document.title = title;
    }
    
    if(!hasFocus) {
        titleCurrentlyChanging = true;
        setTimeout('changeTitle()',1000);
    }
    else {
        titleCurrentlyChanging = false;
        i=0;
        document.title = title;
    }
}

