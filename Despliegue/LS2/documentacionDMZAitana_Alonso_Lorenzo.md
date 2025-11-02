# 📘 Documentación de la DMZ

## Servidor DNS + Firewall

### 1. Preparación del sistema

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt install net-tools -y
sudo apt-get install nano
```

### 2. Configuración de red (Netplan)

El archivo editado en varias ocasiones fue:
`/etc/netplan/50-cloud-init.yaml`

En este escenario **no hay LAN separada**: la interfaz `enp0s8` es la que conecta todas las máquinas de la DMZ, incluyendo Linux Mint.
La interfaz `enp0s3` se mantiene para salida a Internet (NAT).

Ejemplo de configuración:

````yaml
network:
  version: 2
  renderer: networkd
  ethernets:
    enp0s3:   # NAT/Internet
      dhcp4: true
    enp0s8:   # DMZ (todas las VMs, incluido Linux Mint)
      addresses: [192.168.50.1/24]


Aplicar configuración:

```bash
sudo netplan generate
sudo netplan apply
ip a
````

#### Notas:

- enp0s3 suele ser la interfaz conectada al NAT de VirtualBox (salida a Internet).

- enp0s8 se usa como interfaz hacia la DMZ.

- Tras aplicar, se verificó con ip a.

### 3. Configuración de hostname y hosts

Durante la instalación y configuración inicial se editaron los archivos:

```bash
sudo nano /etc/hostname
sudo nano /etc/hosts
```

#### Ejemplo de configuración:

_Hostname:_ DNSServer

_Hosts:_ aalserDNS

Aplicar configuración:

Reiniciar con `sudo reboot`.

### 4. Activar IP Forwarding

Para que el servidor DNS/Firewall pueda enrutar tráfico entre la interfaz de salida a Internet (`enp0s3`) y la red interna/DMZ (`enp0s8`), es necesario habilitar el reenvío de paquetes IPv4.

#### Activación temporal (hasta reinicio)

```bash
sudo sysctl -w net.ipv4.ip_forward=1
```

#### Activación permanente

Editar el archivo `/etc/sysctl.conf` y agregar la siguiente línea:

`net.ipv4.ip_forward = 1`

Reiniciar con `sudo reboot`.

Verificar con `sysctl net.ipv4.ip_forward`.
Salida esperada: `net.ipv4.ip_forward = 1`

#### Notas:

- El comando sysctl -w activa el reenvío de forma inmediata pero no persistente.

- La edición en /etc/sysctl.conf garantiza que el ajuste se mantenga tras reinicios.

- Este paso es imprescindible para que las demás máquinas de la DMZ (incluido Linux Mint) puedan salir a Internet a través del servidor DNS/Firewall.

### 5. Configuración de Firewall (iptables)

Para que el servidor DNS/Firewall pueda enrutar tráfico entre la interfaz de salida a Internet (`enp0s3`) y la red interna/DMZ (`enp0s8`), se configuraron reglas de **iptables** y se instalaron utilidades para hacerlas persistentes.

#### Instalación

```bash
sudo apt install iptables iptables-persistent -y
```

#### Reglas aplicadas

NAT para salida a Internet desde la DMZ:
`sudo iptables -t nat -A POSTROUTING -o enp0s3 -j MASQUERADE`

Permitir tráfico desde la DMZ hacia Internet:

`sudo iptables -A FORWARD -i enp0s8 -o enp0s3 -j ACCEPT`

Permitir respuestas de Internet hacia la DMZ:

`sudo iptables -A FORWARD -i enp0s3 -o enp0s8 -m state --state RELATED,ESTABLISHED -j ACCEPT`

Guardar reglas:

```bash
sudo netfilter-persistent save
```

Verificacción:

```bash
sudo iptables -L -v -n
sudo iptables -t nat -L -v -n
```

#### Notas:

- enp0s3 → interfaz hacia Internet (NAT de VirtualBox).

- enp0s8 → red interna/DMZ (todas las VMs, incluido Linux Mint).

- Con estas reglas, las máquinas de la DMZ pueden salir a Internet a través del servidor DNS/Firewall.

- Se usó iptables-persistent para que las reglas se carguen automáticamente tras reinicios.

### 6. Instalación y configuración de BIND9 (DNS)

#### Instalación

```bash
sudo apt-get install bind9 bind9-utils -y
sudo ufw allow bind9
```

#### Archivo de configuración

Se editó el archivo /etc/bind/named.conf.options para definir los parámetros básicos:

```conf
options {
    directory "/var/cache/bind";

    recursion yes;
    allow-recursion { 192.168.50.0/24; };
    listen-on { 192.168.50.1; };
    listen-on-v6 { none; };

    forwarders {
        8.8.8.8;
        1.1.1.1;
    };

    dnssec-validation no;
};

```

#### Comprobaciones

```bash
sudo named-checkconf
sudo systemctl restart bind9
sudo systemctl status bind9
```

#### Notas:

- El servidor escucha en la interfaz de la DMZ (192.168.50.1).

- Se habilitó la recursión para que las máquinas de la DMZ (incluido Linux Mint) puedan resolver nombres externos.

- Se configuraron forwarders hacia servidores públicos (Google y Cloudflare).

- Se desactivó dnssec-validation para evitar errores en entornos de laboratorio.

- Se verificó la sintaxis con named-checkconf y se reinició el servicio.

### 7. Herramientas de prueba (dnsutils)

Para comprobar que el servicio DNS funciona correctamente, se instalaron utilidades de diagnóstico:

```bash
sudo apt-get install dnsutils -y
```

#### Comrobación:

```bash
nslookup google.es
```

### 8. Acceso remoto (VirtualBox)

#### Conexión por SSH desde el host

```bash
ssh -p 2222 usuario@127.0.0.1
```

OR

```bash
ssh usuario@127.0.0.1
```

## Servidor GitLab (host en DMZ, sin instalación de GitLab)

### 1. Preparación del sistema

```bash
sudo apt-get update
sudo apt-get install net-tools iputils-ping nano -y
```

Se instalaron utilidades básicas (net-tools, iputils-ping, nano).

### 2. Configuración de red (Netplan)

Archivo editado varias veces: `/etc/netplan/50-cloud-init.yaml`

```yaml
network:
  version: 2
  renderer: networkd
  ethernets:
    enp0s3: # Interfaz hacia DMZ
      addresses: [192.168.50.30/24]
      nameservers:
        addresses: [192.168.50.1]
      routes:
        - to: default
          via: 192.168.50.1
```

## Comprobar y aplicar configuración

```bash
sudo netplan generate
sudo netplan apply
ip a
```

## Configuración de hostname y hosts

Editar archivos:

```bash
sudo nano /etc/hostname
sudo nano /etc/hosts
```

#### Ejemplo de configuración:

_Hostname:_ GitLabServer

_Hosts:_ aalserGitLab

Aplicar configuración:

Reiniciar con `sudo reboot`.

### 3. SSH (Acceso remoto)

#### Conexión por SSH desde el host

```bash
ssh usuario@127.0.0.1
```

### 4. Comprobar conectividad

```bash
sudo apt-get install dnsutils -y
nslookup google.es
```

## Servidor Web (Apache + Tomcat)

### 1. Preparación del sistema

```bash
sudo apt-get update
sudo apt install net-tools iputils-ping nano dnsutils -y
```

### 2. Configuración de red (Netplan)

Archivo editado: `/etc/netplan/50-cloud-init.yaml`

```yaml
network:
  version: 2
  renderer: networkd
  ethernets:
    enp0s3: # Interfaz hacia DMZ
      addresses: [192.168.50.10/24]
      nameservers:
        addresses: [192.168.50.1]
      routes:
        - to: default
          via: 192.168.50.1
```

#### Aplicar los cambios

```bash
sudo netplan generate
sudo netplan apply
ip a
```

### 3. Instalación de Apache2

```bash
sudo apt install apache2 -y
sudo systemctl status apache2
```

### 4. Instalación de Java (OpenJDK 17)

```bash
sudo apt install openjdk-17-jdk -y
java -version
```

### 5. Instalación y configuración de Tomcat 11

#### Crear usuario y grupo

```bash
sudo groupadd tomcat
sudo useradd -s /bin/false -g tomcat -d /opt/tomcat tomcat
```

#### Descargar y descomprimir Tomcat

```bash
wget -O apache-tomcat-11.0.13.tar.gz https://dlcdn.apache.org/tomcat/tomcat-11/v11.0.13/bin/apache-tomcat-11.0.13.tar.gz
sudo mkdir /opt/tomcat
sudo tar -xvzf apache-tomcat-11.0.13.tar.gz -C /opt/tomcat/ --strip-components=1
```

#### Permisos

```bash
sudo chown -R tomcat:tomcat /opt/tomcat
sudo chmod g+x /opt/tomcat/conf
```

#### Configuración de usuarios (gestión web)

#### Editar:

- /opt/tomcat/conf/tomcat-users.xml

- /opt/tomcat/webapps/manager/META-INF/context.xml

- /opt/tomcat/webapps/host-manager/META-INF/context.xml

#### Ejemplo de usuario administrador en `tomcat-users.xml`

```xml
<tomcat-users>
  <role rolename="manager-gui"/>
  <role rolename="admin-gui"/>
  <user username="admin" password="admin123" roles="manager-gui,admin-gui"/>
</tomcat-users>
```

#### Crear servicio systemd

#### Archivo: `/etc/systemd/system/tomcat.service`

```ini
[Unit]
Description=Apache Tomcat Web Application Container
After=network.target

[Service]
Type=forking

User=tomcat
Group=tomcat

Environment="JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64"
Environment="CATALINA_PID=/opt/tomcat/temp/tomcat.pid"
Environment="CATALINA_HOME=/opt/tomcat"
Environment="CATALINA_BASE=/opt/tomcat"
Environment="CATALINA_OPTS=-Xms512M -Xmx1024M -server -XX:+UseParallelGC"
Environment="JAVA_OPTS=-Djava.awt.headless=true -Djava.security.egd=file:/dev/./urandom"

ExecStart=/opt/tomcat/bin/startup.sh
ExecStop=/opt/tomcat/bin/shutdown.sh

[Install]
WantedBy=multi-user.target
```

#### Activar servicio

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now tomcat
sudo systemctl status tomcat
```

### 6. Configuración de hostname y hosts

Editar los archivos:

```bash
sudo nano /etc/hostname
sudo nano /etc/hosts
```

#### Ejemplo de configuración:

_Hostname:_ WebServer

_Hosts:_ aalserWeb

Aplicar configuración:

Reiniciar con `sudo reboot`.

### 7. Acceso remoto (VirtualBox)

#### Conexión por SSH desde el host

```bash
ssh usuario@127.0.0.1
```

### 8. Comprobar conectividad

```bash
sudo apt-get install dnsutils -y
nslookup google.es
```

## Servidor FTP (ProFTPD)

### 1. Preparación del sistema

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt install net-tools iputils-ping nano -y
sudo apt-get install openssh-server -y
```

### 2. Configuración de red (Netplan)

Archivo editado: `/etc/netplan/50-cloud-init.yaml`

```yaml
network:
  version: 2
  renderer: networkd
  ethernets:
    enp0s3: # Interfaz hacia DMZ
      addresses: [192.168.50.20/24]
      nameservers:
        addresses: [192.168.50.1]
      routes:
        - to: default
          via: 192.168.50.1
```

#### Aplicar los cambios

```bash
sudo netplan generate
sudo netplan apply
ip a
```

### 3. Configuración de hostname y hosts

Editar los archivos:

```bash
sudo nano /etc/hostname
sudo nano /etc/hosts
```

#### Ejemplo de configuración:

_Hostname:_ FTPServer

_Hosts:_ aalserFTP

Aplicar configuración:

Reiniciar con `sudo reboot`.

### 4. Instalación de ProFTPD

```bash
sudo apt-get install proftpd -y

sudo systemctl status proftpd
```

### 5. Configuración básica de ProFTPD

Archivo principal: `/etc/proftpd/proftpd.conf`

Ejemplo de parámetros mínimos:

```conf
ServerName                      "FTP Server"
DefaultRoot                     ~
RequireValidShell               off
```

Reiniciar servicio: `sudo systemctl restart proftpd`

### 6. Creación de usuario FTP

```bash
sudo adduser aalser
sudo passwd aalser
```

Este usuario podrá autenticarse en el servidor FTP.

### 7. Pruebas de conectividad

#### - Resolución DNS:

```bash
sudo nslookup google.es
```

#### - Conexión FTP:

```bash
ftp 192.168.50.20
```
