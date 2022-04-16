INSERT INTO
	feria_amg4.buyers (name, last_name, email, image, birthday, password)
VALUES
	(
		'Brenda',
		'Cistriano',
		'breen_mica@hotmail.com',
		'1649547330838._img_.jpg',
		'1999-02-10',
		'$2a$10$MHg3D8P9h8nwFR0QJk7ws.SnLhQ910.BYjFvFW0wJvFsHJRcsMajW'
	),
	(
		'Fernanda',
		'Jimenez',
		'fjimenez@gmail.com',
		'1649644030764._img_.png',
		'1990-11-02',
		'$2a$10$lYM1UDgbIN67nN.gCSCM5u0geeNkyLtB4QZqub/FlCuHyvt8jvGse'
	);

INSERT INTO
	feria_amg4.category (
		state,
		class,
		age_group,
		subclass,
		color,
		`size`,
		stock
	)
VALUES
	(1, 'clothes', 'children', 't-shirt', 'grey', 'L', 2),
	(1, 'clothes', 'adult', 'short', 'beige', '42', 1),
	(
		1,
		'shoes',
		'children',
		'sneakers',
		'Azul y amarillo',
		'36',
		1
	),
	(0, 'shoes', 'adult', 'shoe', 'Negro', '39', 1),
	(0, 'clothes', 'adult', 'hat', 'Marrón', 'Universal', 3),
	(0, 'clothes', 'adult', 'dress', 'Silver', '5', 1),
	(
		0,
		'clothes',
		'adult',
		'pants',
		'Marrón claro',
		'42',
		1
	);

INSERT INTO
	feria_amg4.products (
		name,
		description,
		price,
		discount,
		seller_id,
		category_id,
		image
	)
VALUES
	(
		'Remera estampada Marvel Avengers',
		'Aguante Marvel',
		9266.26,
		NULL,
		1,
		1,
		'marvel-avengers-remera.jpg'
	),
	(
		'Short',
		'Es un short',
		1299.99,
		NULL,
		1,
		2,
		'short.jpg'
	),
	(
		'Zapatilla Pikachu',
		'Bien eléctricas',
		15500.00,
		NULL,
		1,
		3,
		'zapatilla-pikachu.jpeg'
	),
	(
		'Zapatos fiesta',
		'Usados en perfecto estado',
		8999.99,
		NULL,
		1,
		4,
		'zapatos-mujer.jpg'
	),
	(
		'Sombrero de vaquero',
		'Da poderes místicos',
		3500.00,
		NULL,
		1,
		5,
		'1649642171553._img_.webp'
	),
	(
		'Vestido de fiesta',
		'Siempre al top',
		25500.00,
		NULL,
		1,
		6,
		'1649642385049._img_.jpg'
	),
	(
		'Pantalones normales',
		'Solo unos pantalones igual que cualquier otro, nada extraño por aquí',
		25500.00,
		NULL,
		1,
		7,
		'1649889234914._img_.jpg'
	);

INSERT INTO
	feria_amg4.sellers (name, last_name, email, image, birthday, password)
VALUES
	(
		'Franco',
		'Santa María',
		'francosantamaria.sm@gmail.com',
		'1649141426250._img_.jpg',
		'1995-06-18',
		'$2a$10$XaT1sFzLvV1la1he5JyXruZRz0PChDlB1Q9yhtNahRak/.KVTv1mq'
	),
	(
		'Juan',
		'Alvarez',
		'jalvarez@gmail.com',
		'1649145106892._img_.jpg.jpg',
		'1990-05-04',
		'$2a$10$fRQSUcAp6qN3Am.k1VAtue.gGejXHso/PfTEKKME4FY7ZT1AQUKGe'
	);