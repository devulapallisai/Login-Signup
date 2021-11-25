--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4
-- Dumped by pg_dump version 13.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    email text,
    password text,
    typeuser text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (email, password, typeuser) FROM stdin;
username@gmail.com	pbkdf2:sha256:260000$3KgAbXqa6oJdYhfX$c448773bea6629e4213450203bb7e6c41533cdfc3ae303f770edf1e9a9dbd184	user
hello@hello.com	pbkdf2:sha256:260000$ZpiiO5hD1HXepMlg$4117d70e621d34f7e273e7beeef8e3a0a9df6dd883a6e2baaa4ca3dd7f00dad1	admin
who@gmail.com	pbkdf2:sha256:260000$LYBdq00TDUeOflIM$7d63b267e70c28b84f0c7947a27ff1b667877366ad79312c3795c783894550ad	admin
me@gmail.com	pbkdf2:sha256:260000$AIBfbAEIwMbQqAT1$e3441ef77e8767b332a0d9d3f0f5aaca1f1f232d139493896cf3bc5d895a7af4	user
who@gmial.com	pbkdf2:sha256:260000$Eu0yFpb75zfMXfru$86671416d8cc42eb2cf6b48750389189639c56d1a100903786fc62ded5a41a49	admin
\.


--
-- PostgreSQL database dump complete
--

