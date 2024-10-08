PGDMP     	            	        |           ExpensesApp    15.4    15.4                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    40094    ExpensesApp    DATABASE     �   CREATE DATABASE "ExpensesApp" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United Kingdom.1252';
    DROP DATABASE "ExpensesApp";
                postgres    false            �            1259    40269    expenses    TABLE     7  CREATE TABLE public.expenses (
    id integer NOT NULL,
    description character varying(255) NOT NULL,
    currency character varying(255) NOT NULL,
    amount numeric(15,3) NOT NULL,
    "transactionDate" timestamp with time zone NOT NULL,
    "deactivateReason" character varying(255),
    "transactionStatus" character varying(255) NOT NULL,
    "transactionStatusChanged" timestamp with time zone,
    "isActive" boolean DEFAULT true,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" integer
);
    DROP TABLE public.expenses;
       public         heap    postgres    false            �            1259    40268    expenses_id_seq    SEQUENCE     �   CREATE SEQUENCE public.expenses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.expenses_id_seq;
       public          postgres    false    219                       0    0    expenses_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.expenses_id_seq OWNED BY public.expenses.id;
          public          postgres    false    218            �            1259    40229 	   userRoles    TABLE     �  CREATE TABLE public."userRoles" (
    id integer NOT NULL,
    "userRoleName" character varying(255),
    "userRoleDescription" character varying(255),
    "isUserRoleActive" boolean DEFAULT true,
    "deactivateReason" character varying(255),
    "activateReason" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."userRoles";
       public         heap    postgres    false            �            1259    40228    userRoles_id_seq    SEQUENCE     �   CREATE SEQUENCE public."userRoles_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public."userRoles_id_seq";
       public          postgres    false    215                       0    0    userRoles_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public."userRoles_id_seq" OWNED BY public."userRoles".id;
          public          postgres    false    214            �            1259    40239    users    TABLE     ?  CREATE TABLE public.users (
    id integer NOT NULL,
    "userName" character varying(255),
    password character varying(255),
    email character varying(255),
    name character varying(255),
    "lastName" character varying(255),
    gender character varying(255),
    "phoneNumber" character varying(255),
    "isUserActive" boolean DEFAULT true,
    "deactivateReason" character varying(255),
    "activateReason" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userRoleId" integer
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    40238    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    217                       0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    216            s           2604    40272    expenses id    DEFAULT     j   ALTER TABLE ONLY public.expenses ALTER COLUMN id SET DEFAULT nextval('public.expenses_id_seq'::regclass);
 :   ALTER TABLE public.expenses ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    219    219            o           2604    40232    userRoles id    DEFAULT     p   ALTER TABLE ONLY public."userRoles" ALTER COLUMN id SET DEFAULT nextval('public."userRoles_id_seq"'::regclass);
 =   ALTER TABLE public."userRoles" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    215    215            q           2604    40242    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216    217                      0    40269    expenses 
   TABLE DATA           �   COPY public.expenses (id, description, currency, amount, "transactionDate", "deactivateReason", "transactionStatus", "transactionStatusChanged", "isActive", "createdAt", "updatedAt", "userId") FROM stdin;
    public          postgres    false    219   k"                 0    40229 	   userRoles 
   TABLE DATA           �   COPY public."userRoles" (id, "userRoleName", "userRoleDescription", "isUserRoleActive", "deactivateReason", "activateReason", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    215   �"                 0    40239    users 
   TABLE DATA           �   COPY public.users (id, "userName", password, email, name, "lastName", gender, "phoneNumber", "isUserActive", "deactivateReason", "activateReason", "createdAt", "updatedAt", "userRoleId") FROM stdin;
    public          postgres    false    217   �"                  0    0    expenses_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.expenses_id_seq', 7, true);
          public          postgres    false    218                       0    0    userRoles_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."userRoles_id_seq"', 2, true);
          public          postgres    false    214                       0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 5, true);
          public          postgres    false    216            z           2606    40277    expenses expenses_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.expenses
    ADD CONSTRAINT expenses_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.expenses DROP CONSTRAINT expenses_pkey;
       public            postgres    false    219            v           2606    40237    userRoles userRoles_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."userRoles"
    ADD CONSTRAINT "userRoles_pkey" PRIMARY KEY (id);
 F   ALTER TABLE ONLY public."userRoles" DROP CONSTRAINT "userRoles_pkey";
       public            postgres    false    215            x           2606    40247    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    217            |           2606    40278    expenses expenses_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.expenses
    ADD CONSTRAINT "expenses_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;
 I   ALTER TABLE ONLY public.expenses DROP CONSTRAINT "expenses_userId_fkey";
       public          postgres    false    219    217    3192            {           2606    40248    users users_userRoleId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "users_userRoleId_fkey" FOREIGN KEY ("userRoleId") REFERENCES public."userRoles"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 G   ALTER TABLE ONLY public.users DROP CONSTRAINT "users_userRoleId_fkey";
       public          postgres    false    215    3190    217                  x������ � �         W   x�3��/H-J,�/J��B�S�8K8c�@����D��T��R��������P���D����gbJnf�#�$�@3����b���� 9�(X         �   x�3��v�L�4�T1JT14P))Ow�
��0*63�J�s��+��ϱL+2�q͍,u-7����-0���22,�ᐞ���������]���	���40�43BK��?2202�50�5�T0��20�2�Գ44�60�+����� Kv.^     