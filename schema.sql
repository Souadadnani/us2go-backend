create table usuarios(
	email varchar(100) primary key,
	password varchar(100) not null,
	nombre varchar(100) not null,
	apellidos varchar(100) not null,
	telefono integer (no hace falta a la hora de registrar sera necesario a la hora de publicar el viaje)
);

la clave foranea email del usuario tiene que ser en cascada en los demas tablas

create table viajes(
	id serial primary key,
	origen varchar(200) not null,
	destino varchar(200) not null,
	fechainicio timestamp not null,
	fechafin timestamp not null,
	itinerarios text,
	usuario varchar(100),
	foreign key (usuario) references usuarios(email)	
);

create table miembros(
	usuario varchar(100),
	viaje integer,
	fechahora timestamp,
	primary key (usuario, viaje),
	foreign key(usuario) references usuarios(email),
	foreign key (viaje) references viajes(id)
);

create table mensajes(
	id serial primary key,
	usuario varchar(100),
	viaje integer,
	mensaje text,
	fechahora timestamp,
	
	foreign key(usuario) references usuarios(email),
	foreign key (viaje) references viajes(id)
);