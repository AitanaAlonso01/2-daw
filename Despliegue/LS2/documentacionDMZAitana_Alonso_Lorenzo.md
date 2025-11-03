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
  ethernets:
    enp0s3:
     dhcp4: true
    enp0s8:
      addresses:
      - 11.0.5.10/24
```


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

_Hosts:_
127.0.0.1 localhost
127.0.1.1 DSNServer

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

#### Configuración de BIND9 – named.conf.options

Archivo: `/etc/bind/named.conf.options`

```conf
options {
        directory "/var/cache/bind";

        // Escuchar en todas las interfaces IPv4
        listen-on { any; };

        // Permitir consultas desde localhost y red local
        allow-query { any; };

        // Redirigir peticiones externas a servidores públicos
        forwarders {
                8.8.8.8;
                8.8.4.4;
        };

        // Desactivar si no es necesario
        dnssec-validation no;

        // Desactivar IPv6 (si no es necesaria)
        //listen-on-v6 { none; };
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
  ethernets:
    #enp0s3:
    # dhcp4: true
    enp0s8:
      addresses:
        - 11.0.5.20/24
      nameservers:
        addresses:
          - 11.0.5.10
      routes:
        - to: default
          via: 11.0.5.10
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

_Hostname:_ GITLABSRV

_Hosts:_
127.0.0.1 localhost
127.0.1.1 aalserGITLAB

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
  ethernets:
    enp0s3:
      dhcp4: true
    enp0s8:
      addresses:
        - 11.0.5.30/24
      nameservers:
        addresses:
          - 11.0.5.10
      routes:
        - to: default
          via: 11.0.5.10
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
<tomcat-users xmlns="http://tomcat.apache.org/xml"
              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
              xsi:schemaLocation="http://tomcat.apache.org/xml tomcat-users.xsd"
              version="1.0">
<role rolename="manager-gui"/>
<role rolename="admin-gui"/>
<user username="aalser" password="aalser" roles="manager-gui,admin-gui"/>

```

#### Crear servicio systemd

#### Archivo: `/etc/systemd/system/tomcat.service`

```ini
[Unit]
Description=Tomcat
After=network.target

[Service]
Type=forking

User=tomcat
Group=tomcat

Environment="JAVA_HOME=/usr/lib/jvm/java-1.17.0-openjdk-amd64"
Environment="JAVA_OPTS=-Djava.security.egd=file:///dev/urandom"
Environment="CATALINA_BASE=/opt/tomcat"
Environment="CATALINA_HOME=/opt/tomcat"
Environment="CATALINA_PID=/opt/tomcat/temp/tomcat.pid"
Environment="CATALINA_OPTS=-Xms512M -Xmx1024M -server -XX:+UseParallelGC"

ExecStart=/opt/tomcat/bin/startup.sh
ExecStop=/opt/tomcat/bin/shutdown.sh

RestartSec=10
Restart=always

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

_Hostname:_ WEBSERVER

_Hosts:_
127.0.0.1 localhost
127.0.1.1 aalserWEBSRVR

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
  ethernets:
    # enp0s3:
    # dhcp4: true
    enp0s8:
      addresses:
        - 11.0.5.40/24
      nameservers:
        addresses:
          - 11.0.5.10
      routes:
        - to: default
          via: 11.0.5.10
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

_Hostname:_ FTPSRV

_Hosts:_
127.0.0.1 localhost
127.0.1.1 aalserFTP

Aplicar configuración:

Reiniciar con `sudo reboot`.

### 4. Instalación de ProFTPD

```bash
sudo apt-get install proftpd -y

sudo systemctl status proftpd
```

### 5. Configuración básica de ProFTPD

Archivo: `/etc/proftpd/proftpd.conf`

```conf
  Include /etc/proftpd/modules.conf

  UseIPv6 on
  <IfModule mod_ident.c>
    IdentLookups off
  </IfModule>

  ServerName "Debian"
  ServerType standalone
  DeferWelcome off
  DefaultServer on
  ShowSymlinks on

  TimeoutNoTransfer 600
  TimeoutStalled 600
  TimeoutIdle 1200

  DenyFilter \*.*/

  # Jail de usuarios en su home (activar si se desea)
  # DefaultRoot ~

  # Permitir login aunque el usuario no tenga shell válida (activar si se desea)
  # RequireValidShell off

  Port 21
  MaxInstances 30

  User proftpd
  Group nogroup

  Umask 022 022
  AllowOverwrite on

  TransferLog /var/log/proftpd/xferlog
  SystemLog /var/log/proftpd/proftpd.log

  <IfModule mod_quotatab.c>
  QuotaEngine off
  </IfModule>

  <IfModule mod_ratio.c>
  Ratios off
  </IfModule>
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

## Cliente Linux Mint (interfaz)

### 1. Preparación del sistema

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt install net-tools iputils-ping nano -y
```

### 2. Configuración de red (Netplan)

Archivo editado: `/etc/netplan/50-cloud-init.yaml`

```yaml
network:
  version: 2
  ethernets:
    #enp0s3:
    #  dhcp4: true
    enp0s8:
      addresses:
        - 11.0.5.30/24
      nameservers:
        addresses:
          - 11.0.5.10
      routes:
        - to: default
          via: 11.0.5.10
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

_Hostname:_ LINUXMINTCLIENT

_Hosts:_
127.0.0.1 localhost
127.0.1.1 aalserLinuxMint

Aplicar configuración:

Reiniciar con `sudo reboot`.

### 4. Acceso remoto (VirtualBox)

#### Conexión por SSH desde el host

```bash
ssh usuario@127.0.0.1
```

### 5. Comprobar conectividad

```bash
sudo apt-get install dnsutils -y
nslookup google.es
```

### 6. Comprobar conectividad a Apache y Apache Tomcat (por navegador)

#### Apache:

```bash
http://127.0.0.1
```

#### Apache Tomcat:

```bash
http://127.0.0.1:8080
```

### 7. Comprobar conectividad a FTP (terminal y filezilla)

#### FTP:

```bash
ftp 127.0.0.1
```

#### Filezilla:

```bash
sftp 127.0.0.1
```

## Páginas Web de Ayuda

- [How to Install Apache Tomcat on Ubuntu 24.04 Cloud Servers](https://www.layerstack.com/resources/tutorials/how-to-install-apachetomcat-on-ubuntu24)

- [Configura un servidor DNS con Bind9 en tu servidor Linux](https://www.redeszone.net/tutoriales/servidores/configurar-servidor-dns-bind-linux/)
