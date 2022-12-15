# Trabalho-de-Paradigmas
##Passos para fazer o docker funcionar

docker run -v  $PWD/assyncjs:/app/web -d -p 8090:80  --name paradigmas dmstr/php-yii2:latest-nginx

nano /etc/nginx/conf.d/default.conf

Adicione abaixo da linha  index       index.php index.html index.htm;  
        add_header 'Cross-Origin-Embedder-Policy' 'require-corp';
        add_header 'Cross-Origin-Opener-Policy' 'same-origin';    

Adicione abaixo da linha add_header Last-Modified ""
        add_header 'Cross-Origin-Embedder-Policy' 'require-corp';
        add_header 'Cross-Origin-Opener-Policy' 'same-origin';    
        
restarte o container

abra no browser http://localhost:8090/ex14.html
