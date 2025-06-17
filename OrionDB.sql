-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 10-06-2025 a las 18:58:40
-- Versión del servidor: 10.6.22-MariaDB-0ubuntu0.22.04.1
-- Versión de PHP: 8.1.2-1ubuntu2.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `OrionDB`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Amistades`
--

CREATE TABLE `Amistades` (
  `id` int(11) NOT NULL,
  `usuario_id_1` int(11) NOT NULL,
  `usuario_id_2` int(11) NOT NULL,
  `fecha_solicitud` datetime DEFAULT current_timestamp(),
  `estado` enum('pendiente','aceptada','rechazada') DEFAULT 'pendiente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Chats`
--

CREATE TABLE `Chats` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Comentarios`
--

CREATE TABLE `Comentarios` (
  `Id` int(11) NOT NULL,
  `Id_Usuario` int(11) NOT NULL,
  `Id_Publicacion` int(11) NOT NULL,
  `Contenido` text NOT NULL,
  `Fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `Comentarios`
--

INSERT INTO `Comentarios` (`Id`, `Id_Usuario`, `Id_Publicacion`, `Contenido`, `Fecha`) VALUES
(1, 2, 1, 'Este es un comentario sobre la primera publicación.', '2025-06-06'),
(2, 3, 1, 'Otro comentario sobre la primera publicación.', '2025-06-06'),
(3, 1, 1, 'Un tercer comentario sobre la primera publicación.', '2025-06-06'),
(4, 1, 2, 'Comentario sobre la segunda publicación.', '2025-06-06'),
(5, 3, 2, 'Otro comentario sobre la segunda publicación.', '2025-06-06'),
(6, 2, 3, 'Comentario sobre la tercera publicación.', '2025-06-06');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Comentario_Reaccion`
--

CREATE TABLE `Comentario_Reaccion` (
  `Id` int(11) NOT NULL,
  `Reaccion` enum('Like','Dislike') NOT NULL,
  `Id_Comentario` int(11) NOT NULL,
  `Id_Usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Grupo`
--

CREATE TABLE `Grupo` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Tipo` enum('Unico','Grupal') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Grupo_Chat`
--

CREATE TABLE `Grupo_Chat` (
  `Id_Chat` int(11) NOT NULL,
  `Id_Grupo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Mapa`
--

CREATE TABLE `Mapa` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Id_Usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Mensaje`
--

CREATE TABLE `Mensaje` (
  `Id` int(11) NOT NULL,
  `Contenido` text NOT NULL,
  `FechaMensaje` date NOT NULL,
  `Id_Usuario` int(11) NOT NULL,
  `Id_Chat` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Publicaciones`
--

CREATE TABLE `Publicaciones` (
  `Id` int(11) NOT NULL,
  `Id_Usuario` int(11) NOT NULL,
  `FechaPubl` date NOT NULL,
  `Titulo` varchar(255) NOT NULL,
  `Imagen` varchar(255) NOT NULL,
  `Contenido` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `Publicaciones`
--

INSERT INTO `Publicaciones` (`Id`, `Id_Usuario`, `FechaPubl`, `Titulo`, `Imagen`, `Contenido`) VALUES
(1, 1, '2025-06-06', 'Primera Publicación', 'imagen1.png', 'Este es el contenido de la primera publicación.'),
(2, 2, '2025-06-06', 'Segunda Publicación', 'imagen2.png', 'Este es el contenido de la segunda publicación.'),
(3, 3, '2025-06-06', 'Tercera Publicación', 'imagen3.png', 'Este es el contenido de la tercera publicación.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Publicacion_Reaccion`
--

CREATE TABLE `Publicacion_Reaccion` (
  `Id` int(11) NOT NULL,
  `Reaccion` enum('Like','Dislike') NOT NULL,
  `Id_Publicacion` int(11) NOT NULL,
  `Id_Usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Usuarios`
--

CREATE TABLE `Usuarios` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `FechaNacimiento` date NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Privilegios` enum('Admin','Usuario') NOT NULL,
  `Bloqueado` tinyint(1) DEFAULT NULL,
  `Perfil` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `Usuarios`
--

INSERT INTO `Usuarios` (`Id`, `Nombre`, `Email`, `FechaNacimiento`, `Password`, `Privilegios`, `Bloqueado`, `Perfil`) VALUES
(1, 'Andrei', 'andrei@gmail.com', '2000-05-19', '$2b$12$bgl.BvOT4HECEiRIyJ08VuD/Kge0RuDxLesUGwLOpzCdCTpZpVoue', 'Admin', 0, NULL),
(2, 'Miguel', 'miguel@gmail.com', '2025-05-23', 'miguel1290', 'Usuario', 0, NULL),
(3, 'Maffi', 'maffi@gmail.com', '2025-02-05', '$2b$12$5wHuKk3MLf7MfTgnup1GF.MQ1N1GnkGJqg4tbGstHYqK4Hq66.Ik6', 'Usuario', 0, ''),
(5, 'Bruno', 'bruno@gmail.com', '2018-03-01', '$2b$12$UBRIeKu4rmVUfKzbWiCJ9uQSjtoRsN/E.OCAXzPN7VpX.JJnLITT6', 'Usuario', 0, ''),
(7, 'Karla', 'karla@gmail.com', '2016-03-03', '$2b$12$xvxTvZbR0NeTVR2jboXwdOjFn.b6ONoFuXxqF1wUOjAdj1I8AuloC', 'Usuario', 0, ''),
(13, 'Marcos', 'marcos@gmail.com', '2025-06-02', '$2b$12$o4Vv.dh7geekVvfdn07tDOIXwqFXx0NLKClKrVqpQPvDxOtVV2tP2', 'Usuario', 0, 'assets/images/placeholder.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Usuario_Grupo`
--

CREATE TABLE `Usuario_Grupo` (
  `Id_Usuario` int(11) NOT NULL,
  `Id_Grupo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Usuario_Personaje`
--

CREATE TABLE `Usuario_Personaje` (
  `Id_Usuario` int(11) NOT NULL,
  `Id_Personaje` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Amistades`
--
ALTER TABLE `Amistades`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id_1` (`usuario_id_1`),
  ADD KEY `usuario_id_2` (`usuario_id_2`);

--
-- Indices de la tabla `Chats`
--
ALTER TABLE `Chats`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `Comentarios`
--
ALTER TABLE `Comentarios`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `FK_UsuarioComentario_Id` (`Id_Usuario`),
  ADD KEY `FK_UsuarioPublicacionComentario_Id` (`Id_Publicacion`);

--
-- Indices de la tabla `Comentario_Reaccion`
--
ALTER TABLE `Comentario_Reaccion`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `FK_ComentarioReaccion_Id` (`Id_Comentario`),
  ADD KEY `FK_UsuarioComentarioReaccion_Id` (`Id_Usuario`);

--
-- Indices de la tabla `Grupo`
--
ALTER TABLE `Grupo`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `Grupo_Chat`
--
ALTER TABLE `Grupo_Chat`
  ADD KEY `FK_Chat_Id` (`Id_Chat`),
  ADD KEY `FK_Grupo_Id` (`Id_Grupo`);

--
-- Indices de la tabla `Mapa`
--
ALTER TABLE `Mapa`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `FK_UsuarioMapa_Id` (`Id_Usuario`);

--
-- Indices de la tabla `Mensaje`
--
ALTER TABLE `Mensaje`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `FK_Usuario_Id` (`Id_Usuario`),
  ADD KEY `FK_MensajeChat_Id` (`Id_Chat`);

--
-- Indices de la tabla `Publicaciones`
--
ALTER TABLE `Publicaciones`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `FK_UsuarioPublicacion_Id` (`Id_Usuario`);

--
-- Indices de la tabla `Publicacion_Reaccion`
--
ALTER TABLE `Publicacion_Reaccion`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `FK_PublicacionReaccion_Id` (`Id_Publicacion`),
  ADD KEY `FK_UsuarioPublicacionReaccion_Id` (`Id_Usuario`);

--
-- Indices de la tabla `Usuarios`
--
ALTER TABLE `Usuarios`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- Indices de la tabla `Usuario_Grupo`
--
ALTER TABLE `Usuario_Grupo`
  ADD KEY `FK_UsuarioGrupo_Id` (`Id_Usuario`),
  ADD KEY `FK_GrupoUsuario_Id` (`Id_Grupo`);

--
-- Indices de la tabla `Usuario_Personaje`
--
ALTER TABLE `Usuario_Personaje`
  ADD KEY `FK_UsuarioPersonaje_Id` (`Id_Usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Amistades`
--
ALTER TABLE `Amistades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Chats`
--
ALTER TABLE `Chats`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Comentarios`
--
ALTER TABLE `Comentarios`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `Comentario_Reaccion`
--
ALTER TABLE `Comentario_Reaccion`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Grupo`
--
ALTER TABLE `Grupo`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Mapa`
--
ALTER TABLE `Mapa`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Mensaje`
--
ALTER TABLE `Mensaje`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Publicaciones`
--
ALTER TABLE `Publicaciones`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `Publicacion_Reaccion`
--
ALTER TABLE `Publicacion_Reaccion`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Usuarios`
--
ALTER TABLE `Usuarios`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Amistades`
--
ALTER TABLE `Amistades`
  ADD CONSTRAINT `Amistades_ibfk_1` FOREIGN KEY (`usuario_id_1`) REFERENCES `Usuarios` (`Id`),
  ADD CONSTRAINT `Amistades_ibfk_2` FOREIGN KEY (`usuario_id_2`) REFERENCES `Usuarios` (`Id`);

--
-- Filtros para la tabla `Comentarios`
--
ALTER TABLE `Comentarios`
  ADD CONSTRAINT `FK_UsuarioComentario_Id` FOREIGN KEY (`Id_Usuario`) REFERENCES `Usuarios` (`Id`),
  ADD CONSTRAINT `FK_UsuarioPublicacionComentario_Id` FOREIGN KEY (`Id_Publicacion`) REFERENCES `Publicaciones` (`Id`);

--
-- Filtros para la tabla `Comentario_Reaccion`
--
ALTER TABLE `Comentario_Reaccion`
  ADD CONSTRAINT `FK_ComentarioReaccion_Id` FOREIGN KEY (`Id_Comentario`) REFERENCES `Comentarios` (`Id`),
  ADD CONSTRAINT `FK_UsuarioComentarioReaccion_Id` FOREIGN KEY (`Id_Usuario`) REFERENCES `Usuarios` (`Id`);

--
-- Filtros para la tabla `Grupo_Chat`
--
ALTER TABLE `Grupo_Chat`
  ADD CONSTRAINT `FK_Chat_Id` FOREIGN KEY (`Id_Chat`) REFERENCES `Chats` (`Id`),
  ADD CONSTRAINT `FK_Grupo_Id` FOREIGN KEY (`Id_Grupo`) REFERENCES `Grupo` (`Id`);

--
-- Filtros para la tabla `Mapa`
--
ALTER TABLE `Mapa`
  ADD CONSTRAINT `FK_UsuarioMapa_Id` FOREIGN KEY (`Id_Usuario`) REFERENCES `Usuarios` (`Id`);

--
-- Filtros para la tabla `Mensaje`
--
ALTER TABLE `Mensaje`
  ADD CONSTRAINT `FK_MensajeChat_Id` FOREIGN KEY (`Id_Chat`) REFERENCES `Chats` (`Id`),
  ADD CONSTRAINT `FK_Usuario_Id` FOREIGN KEY (`Id_Usuario`) REFERENCES `Usuarios` (`Id`);

--
-- Filtros para la tabla `Publicaciones`
--
ALTER TABLE `Publicaciones`
  ADD CONSTRAINT `FK_UsuarioPublicacion_Id` FOREIGN KEY (`Id_Usuario`) REFERENCES `Usuarios` (`Id`);

--
-- Filtros para la tabla `Publicacion_Reaccion`
--
ALTER TABLE `Publicacion_Reaccion`
  ADD CONSTRAINT `FK_PublicacionReaccion_Id` FOREIGN KEY (`Id_Publicacion`) REFERENCES `Publicaciones` (`Id`),
  ADD CONSTRAINT `FK_UsuarioPublicacionReaccion_Id` FOREIGN KEY (`Id_Usuario`) REFERENCES `Usuarios` (`Id`);

--
-- Filtros para la tabla `Usuario_Grupo`
--
ALTER TABLE `Usuario_Grupo`
  ADD CONSTRAINT `FK_GrupoUsuario_Id` FOREIGN KEY (`Id_Grupo`) REFERENCES `Grupo` (`Id`),
  ADD CONSTRAINT `FK_UsuarioGrupo_Id` FOREIGN KEY (`Id_Usuario`) REFERENCES `Usuarios` (`Id`);

--
-- Filtros para la tabla `Usuario_Personaje`
--
ALTER TABLE `Usuario_Personaje`
  ADD CONSTRAINT `FK_UsuarioPersonaje_Id` FOREIGN KEY (`Id_Usuario`) REFERENCES `Usuarios` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
