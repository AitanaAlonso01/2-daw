# LDAP Configuración

**poner el dhcp4 a true** y comentar lo demás en el enp0s3.

### apuntar: ip route, resolvectl, ip a

## configuración netplan

```bash
enp0s3:
  #dhcp: true
  addresses:
    - 10.0.2.205/24 #una ip en el rango 10.0.2.X
  routes:
    - to: default
      via: 10.0.2.2 #lo que ponga en ip route
  nameservers:
    addresses:
      - 10.0.2.205 #lo que ponga en ip a
    search: [aaldaw.local]
enp0s8:
  #dhcp: true
  addresses:
    - 192.168.205.50/24 #lo que ponga en el escenario
```

## configurar reenviadores

```bash
sudo nano /etc/bind/named.conf.options
```

```bash
options {
        directory "/var/cache/bind";
        listen-on { any; };
        allow-query { loaclhost; 192.168.205.0/24; }; #cambiar y poner la ip del rango de la red interna
        forwarders {
          10.2.1.254; #resolvectl
        };
        dnssec-validation no;
}
```

## configurar zonas

```bash
sudo nano /etc/bind/named.conf.local
```

```bash
#zona directa
zone "aaldaw.local" {
        type master;
        file "/etc/bind/zonas/db.aaldaw.local";
};

#zona inversa
zone "205.168.192.in-addr.arpa" {
        type master;
        file "/etc/bind/zonas/db.205.168.192.in-addr.arpa";
};
```

**Crear carpeta zonas y moverse dentro:**

```bash
mkdir zonas
cd /etc/bind/zonas
```

### zona directa

**NOTA: acordarse que está dentro de /etc/bind/zonas**

```bash
sudo cp db.emsdaw.local db.aaldaw.local #copias el fichero con otro nombre
sudo rm db.emsdaw.local #borras el que no te sirve
sudo nano db.aaldaw.local #editas el que te sirve
```

```bash
$TTL    86400
@       IN      SOA     ns1.aaldaw.local. root.aaldaw.local. (
  #dejarlo como está
)

@       IN      NS      ns1.
ns1     IN      A       192.168.205.50
dns     IN      A       192.168.205.50
gitlab  IN      A       192.168.205.100
web     IN      A       192.168.205.150
ftp     IN      A       192.168.205.200
aalcli  IN      A       192.168.205.114
git     IN      CNAME   gitlab
server  IN      CNAME   dns
```

### zona inversa

**NOTA: acordarse que está dentro de /etc/bind/zonas**

```bash
sudo cp db.200.168.192.in-addr.arpa db.205.168.192.in-addr.arpa #copias el fichero con otro nombre
sudo rm db.200.168.192.in-addr.arpa #borras el que no te sirve
sudo nano db.205.168.192.in-addr.arpa
```

````bash
@       IN      SOA     ns1.aaldaw.local. root.aaldaw.local. (
  #dejarlo como está
)

@       IN      NS      ns1.aaldaw.local.
50      IN      A       dns.aaldaw.local.
100     IN      A       gitlab.aaldaw.local.
150     IN      A       web.aaldaw.local.
200     IN      A       ftp.aaldaw.local.
114     IN      A       aalcli.aaldaw.local.
```xyzdaw.local

```bash
sudo systemctl restart bind9
sudo systemctl status bind9

nslookup www.google.com
nslookup ns1.aaldaw.local

sudo named-checkconf
sudo named-checkzone aaldaw.local db.aaldaw.local
sudo named-checkzone 205.168.192.in-addr.arpa db.205.168.192.in-addr.arpa
````

## configurar cliente

**NOTA:** acordarse que hay que cambiar las **ips** y el **dominio de busqueda**, si por un casual alguna comprobación no funciona, probar el **sudo netplan apply 90** en el cliente

- comprobar que el cliente tiene interner: nslookup www.google.com (si es que si, esta bien configurada la red interna)
- comprobar que hace ssh al dns,ns1,server y a la ip del dns

si no funciona

```
ssh dns@dns
```

Pero si dns@192.168.205.50, entrar a configurar el archivo /etc/resolv.conf y cambiar el dominio de forma manual.

# Hoja de Ruta Completa para Configurar LDAP (OpenLDAP) en Ubuntu

Basado en los tutoriales de SomeBooks.es utilizados en clase.

---

## Instalación y configuración inicial del servidor LDAP

**Objetivo:** Dejar OpenLDAP instalado, configurado y funcionando.

Pasos:

- Configurar IP estática en el servidor.
- Ajustar `/etc/hostname` y `/etc/hosts` con el dominio (ej: `ldapserver.aaldaw.local`).
- Actualizar el sistema.
- Instalar paquetes:

```

sudo apt update
sudo apt install slapd ldap-utils

```

- Reconfigurar OpenLDAP:

```sudo dpkg-reconfigure slapd

```

- Dominio: `aaldaw.local`
- Organización: la que quieras
- Contraseña admin LDAP
- Eliminar BD antigua: Sí

---

## Crear la estructura base del directorio (DIT)

**Objetivo:** Crear la OU donde irán grupos y usuarios.

Ejemplo de archivo `ou.ldif`:

```ldif
dn: ou=miou,dc=aaldaw,dc=local
objectClass: top
objectClass: organizationalUnit
ou: miou
```

Añadirlo:

```
sudo ldapadd -x -D cn=admin,dc=aaldaw,dc=local -W -f ou.ldif
```

Comprobar:

```
sudo slapcat
```

---

## Crear grupos y usuarios manualmente

**Objetivo:** Añadir un grupo y un usuario dentro de la OU.

### Crear grupo

Archivo `grupo.ldif`:

```ldif
dn: cn=grupo1,ou=miou,dc=aaldaw,dc=local
objectClass: top
objectClass: posixGroup
gidNumber: 10000
cn: grupo1
```

Añadirlo:

```
sudo ldapadd -x -D cn=admin,dc=aaldaw,dc=local -W -f grupo.ldif
```

### Crear usuario

Generar contraseña cifrada:

```
sudo slappasswd
```

Archivo `usuario.ldif`:

```ldif
dn: uid=usuario1,ou=miou,dc=aaldaw,dc=local
objectClass: top
objectClass: posixAccount
objectClass: inetOrgPerson
objectClass: person
cn: usuario1
sn: Usuario
uid: usuario1
uidNumber: 2000
gidNumber: 10000
homeDirectory: /home/usuario1
loginShell: /bin/bash
userPassword: {SSHA}contraseña_cifrada
```

Añadirlo:

```
sudo ldapadd -x -D cn=admin,dc=aaldaw,dc=local -W -f usuario.ldif
```

---

## Buscar, modificar y eliminar elementos del directorio

**Objetivo:** Gestionar objetos LDAP.

Buscar usuario:

```
ldapsearch -xLLL -b "dc=aaldaw,dc=local" uid=usuario1
```

Modificar con:

```
ldapmodify -x -D cn=admin,dc=aaldaw,dc=local -W -f archivo.ldif
```

Eliminar:

```
ldapdelete -x -D cn=admin,dc=aaldaw,dc=local -W "dn_del_objeto"
```

---

## Configurar un cliente Ubuntu para autenticarse en LDAP

**Objetivo:** Permitir login con usuarios LDAP.

Instalar paquetes:

```
sudo apt install libnss-ldap libpam-ldap ldap-utils nslcd
```

Configurar:

- Servidor LDAP → IP del servidor
- Base DN → `dc=aaldaw,dc=local`

Editar `/etc/nsswitch.conf`:

```text
passwd:         files systemd ldap
group:          files systemd ldap
shadow:         files ldap
```

Crear home automáticamente:
Editar `/etc/pam.d/common-session` y añadir:

```text
session required pam_mkhomedir.so skel=/etc/skel umask=0022
```

---

## Iniciar sesión gráfica con un usuario LDAP

**Objetivo:** Verificar que todo funciona.

- Reiniciar el cliente.
- En la pantalla de login, escribir el usuario LDAP.
- El sistema creará el home y permitirá entrar al escritorio.

**Hay que activar el inicio de sesión manual en el cliente Ubuntu. Inicio>>Administración>>Ventana de Inicio de Sesión>>Usuarios>>Permitir el inicio de sesión manual**
