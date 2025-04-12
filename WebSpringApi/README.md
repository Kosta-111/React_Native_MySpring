# npd211-asp

Create docker hub repository - publish
```
docker build -t npd211-asp-api . 
docker run -it --rm -p 4759:8080 --name npd211-asp_container npd211-asp-api
docker run -d --restart=always --name npd211-asp_container -p 4759:8080 npd211-asp-api
docker run -d --restart=always -v d:/volumes/npd211-asp/images:/app/uploading --name npd211-asp_container -p 4759:8080 npd211-asp-api
docker run -d --restart=always -v /volumes/npd211-asp/images:/app/uploading --name npd211-asp_container -p 4759:8080 npd211-asp-api
docker ps -a
docker stop npd211-asp_container
docker rm npd211-asp_container

docker images --all
docker rmi npd211-asp-api

docker login
docker tag npd211-asp-api:latest novakvova/npd211-asp-api:latest
docker push novakvova/npd211-asp-api:latest

docker pull novakvova/npd211-asp-api:latest
docker ps -a
docker run -d --restart=always --name npd211-asp_container -p 4759:8080 novakvova/npd211-asp-api

docker run -d --restart=always -v /volumes/npd211-asp/images:/app/uploading --name npd211-asp_container -p 4759:8080 novakvova/npd211-asp-api


docker pull novakvova/npd211-asp-api:latest
docker images --all
docker ps -a
docker stop npd211-asp_container
docker rm npd211-asp_container
docker run -d --restart=always --name npd211-asp_container -p 4759:8080 novakvova/npd211-asp-api
```

```nginx options /etc/nginx/sites-available/default
server {
    server_name   npd211api.itstep.click *.npd211api.itstep.click;
    client_max_body_size 200M;
    location / {
       proxy_pass         http://localhost:4759;
       proxy_http_version 1.1;
       proxy_set_header   Upgrade $http_upgrade;
       proxy_set_header   Connection keep-alive;
       proxy_set_header   Host $host;
       proxy_cache_bypass $http_upgrade;
       proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
       proxy_set_header   X-Forwarded-Proto $scheme;
    }
}


sudo systemctl restart nginx
certbot
```
