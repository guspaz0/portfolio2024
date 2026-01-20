-- CreateTable
CREATE TABLE "aptitudes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "imagen" TEXT,
    "icon" TEXT,
    "nivel" TEXT,
    "categoria_id" INTEGER NOT NULL,
    CONSTRAINT "aptitudes_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categorias" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "categorias" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "certificados" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "imagen" TEXT,
    "fecha" DATETIME,
    "escuela_id" INTEGER NOT NULL,
    CONSTRAINT "certificados_escuela_id_fkey" FOREIGN KEY ("escuela_id") REFERENCES "escuelas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "escuelas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "imagen" TEXT
);

-- CreateTable
CREATE TABLE "eventos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fecha" DATETIME,
    "imagen" TEXT
);

-- CreateTable
CREATE TABLE "experiencias" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "empresa" TEXT,
    "imagen" TEXT,
    "fecha" DATETIME,
    "fecha_fin" DATETIME
);

-- CreateTable
CREATE TABLE "perfiles" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "proyectos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fecha" DATETIME,
    "imagen" TEXT,
    "repositorio" TEXT,
    "deploy" TEXT
);

-- CreateTable
CREATE TABLE "certificados_perfil" (
    "perfil_id" INTEGER NOT NULL,
    "certificado_id" INTEGER NOT NULL,

    PRIMARY KEY ("certificado_id", "perfil_id"),
    CONSTRAINT "certificados_perfil_perfil_id_fkey" FOREIGN KEY ("perfil_id") REFERENCES "perfiles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "certificados_perfil_certificado_id_fkey" FOREIGN KEY ("certificado_id") REFERENCES "certificados" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "aptitudes_perfil" (
    "aptitud_id" INTEGER NOT NULL,
    "perfil_id" INTEGER NOT NULL,

    PRIMARY KEY ("aptitud_id", "perfil_id"),
    CONSTRAINT "aptitudes_perfil_aptitud_id_fkey" FOREIGN KEY ("aptitud_id") REFERENCES "aptitudes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "aptitudes_perfil_perfil_id_fkey" FOREIGN KEY ("perfil_id") REFERENCES "perfiles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "proyectos_perfil" (
    "proyecto_id" INTEGER NOT NULL,
    "perfil_id" INTEGER NOT NULL,

    PRIMARY KEY ("proyecto_id", "perfil_id"),
    CONSTRAINT "proyectos_perfil_proyecto_id_fkey" FOREIGN KEY ("proyecto_id") REFERENCES "proyectos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "proyectos_perfil_perfil_id_fkey" FOREIGN KEY ("perfil_id") REFERENCES "perfiles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "perfiles_escuelas" (
    "escuela_id" INTEGER NOT NULL,
    "perfil_id" INTEGER NOT NULL,

    PRIMARY KEY ("escuela_id", "perfil_id"),
    CONSTRAINT "perfiles_escuelas_escuela_id_fkey" FOREIGN KEY ("escuela_id") REFERENCES "escuelas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "perfiles_escuelas_perfil_id_fkey" FOREIGN KEY ("perfil_id") REFERENCES "perfiles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "proyectos_aptitudes" (
    "aptitud_id" INTEGER NOT NULL,
    "proyecto_id" INTEGER NOT NULL,

    PRIMARY KEY ("aptitud_id", "proyecto_id"),
    CONSTRAINT "proyectos_aptitudes_aptitud_id_fkey" FOREIGN KEY ("aptitud_id") REFERENCES "aptitudes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "proyectos_aptitudes_proyecto_id_fkey" FOREIGN KEY ("proyecto_id") REFERENCES "proyectos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "certificados_aptitudes" (
    "aptitud_id" INTEGER NOT NULL,
    "certificado_id" INTEGER NOT NULL,

    PRIMARY KEY ("aptitud_id", "certificado_id"),
    CONSTRAINT "certificados_aptitudes_aptitud_id_fkey" FOREIGN KEY ("aptitud_id") REFERENCES "aptitudes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "certificados_aptitudes_certificado_id_fkey" FOREIGN KEY ("certificado_id") REFERENCES "certificados" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "experiencias_perfil" (
    "experiencia_id" INTEGER NOT NULL,
    "perfil_id" INTEGER NOT NULL,

    PRIMARY KEY ("experiencia_id", "perfil_id"),
    CONSTRAINT "experiencias_perfil_experiencia_id_fkey" FOREIGN KEY ("experiencia_id") REFERENCES "experiencias" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "experiencias_perfil_perfil_id_fkey" FOREIGN KEY ("perfil_id") REFERENCES "perfiles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);