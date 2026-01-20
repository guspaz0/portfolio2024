-- CreateTable
CREATE TABLE "aptitudes" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "imagen" TEXT,
    "icon" TEXT,
    "nivel" INTEGER,
    "categoria_id" INTEGER NOT NULL,

    CONSTRAINT "aptitudes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorias" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "certificados" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "imagen" TEXT,
    "fecha" TIMESTAMP(3),
    "escuela_id" INTEGER NOT NULL,

    CONSTRAINT "certificados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "escuelas" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "imagen" TEXT,

    CONSTRAINT "escuelas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eventos" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fecha" TIMESTAMP(3),
    "imagen" TEXT,

    CONSTRAINT "eventos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "experiencias" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "empresa" TEXT,
    "imagen" TEXT,
    "fecha" TIMESTAMP(3),
    "fecha_fin" TIMESTAMP(3),

    CONSTRAINT "experiencias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "perfiles" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "perfiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "proyectos" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fecha" TIMESTAMP(3),
    "imagen" TEXT,
    "repositorio" TEXT,
    "deploy" TEXT,

    CONSTRAINT "proyectos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "certificados_perfil" (
    "perfil_id" INTEGER NOT NULL,
    "certificado_id" INTEGER NOT NULL,

    CONSTRAINT "certificados_perfil_pkey" PRIMARY KEY ("certificado_id","perfil_id")
);

-- CreateTable
CREATE TABLE "aptitudes_perfil" (
    "aptitud_id" INTEGER NOT NULL,
    "perfil_id" INTEGER NOT NULL,

    CONSTRAINT "aptitudes_perfil_pkey" PRIMARY KEY ("aptitud_id","perfil_id")
);

-- CreateTable
CREATE TABLE "proyectos_perfil" (
    "proyecto_id" INTEGER NOT NULL,
    "perfil_id" INTEGER NOT NULL,

    CONSTRAINT "proyectos_perfil_pkey" PRIMARY KEY ("proyecto_id","perfil_id")
);

-- CreateTable
CREATE TABLE "perfiles_escuelas" (
    "escuela_id" INTEGER NOT NULL,
    "perfil_id" INTEGER NOT NULL,

    CONSTRAINT "perfiles_escuelas_pkey" PRIMARY KEY ("escuela_id","perfil_id")
);

-- CreateTable
CREATE TABLE "proyectos_aptitudes" (
    "aptitud_id" INTEGER NOT NULL,
    "proyecto_id" INTEGER NOT NULL,

    CONSTRAINT "proyectos_aptitudes_pkey" PRIMARY KEY ("aptitud_id","proyecto_id")
);

-- CreateTable
CREATE TABLE "certificados_aptitudes" (
    "aptitud_id" INTEGER NOT NULL,
    "certificado_id" INTEGER NOT NULL,

    CONSTRAINT "certificados_aptitudes_pkey" PRIMARY KEY ("aptitud_id","certificado_id")
);

-- CreateTable
CREATE TABLE "experiencias_perfil" (
    "experiencia_id" INTEGER NOT NULL,
    "perfil_id" INTEGER NOT NULL,

    CONSTRAINT "experiencias_perfil_pkey" PRIMARY KEY ("experiencia_id","perfil_id")
);

-- AddForeignKey
ALTER TABLE "aptitudes" ADD CONSTRAINT "aptitudes_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certificados" ADD CONSTRAINT "certificados_escuela_id_fkey" FOREIGN KEY ("escuela_id") REFERENCES "escuelas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certificados_perfil" ADD CONSTRAINT "certificados_perfil_perfil_id_fkey" FOREIGN KEY ("perfil_id") REFERENCES "perfiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certificados_perfil" ADD CONSTRAINT "certificados_perfil_certificado_id_fkey" FOREIGN KEY ("certificado_id") REFERENCES "certificados"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aptitudes_perfil" ADD CONSTRAINT "aptitudes_perfil_aptitud_id_fkey" FOREIGN KEY ("aptitud_id") REFERENCES "aptitudes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aptitudes_perfil" ADD CONSTRAINT "aptitudes_perfil_perfil_id_fkey" FOREIGN KEY ("perfil_id") REFERENCES "perfiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proyectos_perfil" ADD CONSTRAINT "proyectos_perfil_proyecto_id_fkey" FOREIGN KEY ("proyecto_id") REFERENCES "proyectos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proyectos_perfil" ADD CONSTRAINT "proyectos_perfil_perfil_id_fkey" FOREIGN KEY ("perfil_id") REFERENCES "perfiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "perfiles_escuelas" ADD CONSTRAINT "perfiles_escuelas_escuela_id_fkey" FOREIGN KEY ("escuela_id") REFERENCES "escuelas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "perfiles_escuelas" ADD CONSTRAINT "perfiles_escuelas_perfil_id_fkey" FOREIGN KEY ("perfil_id") REFERENCES "perfiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proyectos_aptitudes" ADD CONSTRAINT "proyectos_aptitudes_aptitud_id_fkey" FOREIGN KEY ("aptitud_id") REFERENCES "aptitudes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proyectos_aptitudes" ADD CONSTRAINT "proyectos_aptitudes_proyecto_id_fkey" FOREIGN KEY ("proyecto_id") REFERENCES "proyectos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certificados_aptitudes" ADD CONSTRAINT "certificados_aptitudes_aptitud_id_fkey" FOREIGN KEY ("aptitud_id") REFERENCES "aptitudes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certificados_aptitudes" ADD CONSTRAINT "certificados_aptitudes_certificado_id_fkey" FOREIGN KEY ("certificado_id") REFERENCES "certificados"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experiencias_perfil" ADD CONSTRAINT "experiencias_perfil_experiencia_id_fkey" FOREIGN KEY ("experiencia_id") REFERENCES "experiencias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experiencias_perfil" ADD CONSTRAINT "experiencias_perfil_perfil_id_fkey" FOREIGN KEY ("perfil_id") REFERENCES "perfiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
