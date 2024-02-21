create table usuarios(
	email varchar(150) primary key,
	password varchar(250) not null,
	nombre varchar(100) not null,
	apellidos varchar(120) not null,
	telefono integer
)

create table viajes(
	id serial primary key,
	destino varchar(100) not null,
	fechainicio timestamp not null,
	fechafin timestamp not null,
	itinerarios text,
	usuario varchar(150),
	foreign key (usuario) references usuarios(email)	
)