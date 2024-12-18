create table foods(
id integer primary KEY,
name VARCHAR,
price REAL
);

create TABLE filings(
id integer,
idFood integer,
name varchar,
price real,
PRIMARY key (id, idFood),
FOREIGN key(idFood) REFERENCES foods(id)
);

INSERT INTO filings (id, idFood, name, price) VALUES
(1, 1, 'Queijo', 0.5),
(1, 2, 'Queijo', 0.5),
(1, 3, 'Queijo', 0.5),
(2, 1, 'Presunto', 0.8),
(2, 2, 'Presunto', 0.8),
(2, 3, 'Presunto', 0.8),
(3, 1, 'Carne', 1.5),
(3, 2, 'Carne', 1.5),
(3, 3, 'Carne', 1.5),
(4, 1, 'Requeijão', 2),
(4, 2, 'Requeijão', 2),
(4, 3, 'Requeijão', 2),
(5, 1, 'Frango', 1.75),
(5, 2, 'Frango', 1.75),
(5, 3, 'Frango', 1.75),
(6, 1, 'Calabresa', 2.4),
(6, 2, 'Calabresa', 2.4),
(6, 3, 'Calabresa', 2.4);

INSERT INTO foods (id, name, price) VALUES
(1, 'Tapioca', 3.5),
(2, 'Cuscuz', 4.5),
(3, 'Sanduiche', 5.5);


CREATE TABLE IF NOT EXISTS public.sales
(
    id integer NOT NULL DEFAULT nextval('sales_id_seq'::regclass),
    idfood integer,
    cpf character varying COLLATE pg_catalog."default",
    datesale timestamp without time zone DEFAULT now(),
    descripition character varying COLLATE pg_catalog."default",
    price real,
    CONSTRAINT sales_pkey PRIMARY KEY (id),
    CONSTRAINT sales_idfood_fkey FOREIGN KEY (idfood)
        REFERENCES public.foods (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
