-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 18-06-2025 a las 02:46:42
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

--
-- Volcado de datos para la tabla `Amistades`
--

INSERT INTO `Amistades` (`id`, `usuario_id_1`, `usuario_id_2`, `fecha_solicitud`, `estado`) VALUES
(2, 1, 2, '2025-06-17 22:17:48', 'aceptada'),
(3, 1, 3, '2025-06-17 22:17:48', 'aceptada'),
(4, 1, 4, '2025-06-17 22:17:48', 'aceptada'),
(5, 1, 5, '2025-06-17 22:17:48', 'aceptada'),
(6, 1, 6, '2025-06-17 22:17:48', 'aceptada'),
(7, 1, 7, '2025-06-17 22:17:48', 'aceptada'),
(8, 1, 8, '2025-06-17 22:17:48', 'aceptada'),
(9, 1, 9, '2025-06-17 22:17:48', 'aceptada'),
(10, 1, 10, '2025-06-17 22:17:48', 'aceptada'),
(11, 1, 11, '2025-06-17 22:17:48', 'aceptada'),
(12, 1, 12, '2025-06-17 22:17:48', 'aceptada'),
(13, 1, 13, '2025-06-17 22:17:48', 'aceptada'),
(14, 1, 14, '2025-06-17 22:17:48', 'aceptada'),
(15, 1, 15, '2025-06-17 22:17:48', 'aceptada'),
(16, 1, 16, '2025-06-17 22:17:48', 'aceptada'),
(17, 1, 17, '2025-06-17 22:17:48', 'aceptada'),
(18, 1, 18, '2025-06-17 22:17:48', 'aceptada'),
(19, 1, 19, '2025-06-17 22:17:48', 'aceptada'),
(20, 1, 20, '2025-06-17 22:17:48', 'aceptada'),
(21, 1, 21, '2025-06-17 22:17:48', 'aceptada'),
(22, 1, 22, '2025-06-17 22:17:48', 'aceptada'),
(23, 1, 23, '2025-06-17 22:17:48', 'aceptada'),
(24, 1, 24, '2025-06-17 22:17:48', 'aceptada'),
(25, 1, 25, '2025-06-17 22:17:48', 'aceptada'),
(26, 2, 3, '2025-06-17 22:17:48', 'aceptada'),
(27, 2, 4, '2025-06-17 22:17:48', 'aceptada'),
(28, 2, 5, '2025-06-17 22:17:48', 'aceptada'),
(29, 2, 6, '2025-06-17 22:17:48', 'aceptada'),
(30, 2, 7, '2025-06-17 22:17:48', 'aceptada'),
(31, 2, 8, '2025-06-17 22:17:48', 'aceptada'),
(32, 2, 9, '2025-06-17 22:17:48', 'aceptada'),
(33, 2, 10, '2025-06-17 22:17:48', 'aceptada'),
(34, 2, 11, '2025-06-17 22:17:48', 'aceptada'),
(35, 2, 12, '2025-06-17 22:17:48', 'aceptada'),
(36, 2, 13, '2025-06-17 22:17:48', 'aceptada'),
(37, 2, 14, '2025-06-17 22:17:48', 'aceptada'),
(38, 2, 15, '2025-06-17 22:17:48', 'aceptada'),
(39, 2, 16, '2025-06-17 22:17:48', 'aceptada'),
(40, 2, 17, '2025-06-17 22:17:48', 'aceptada'),
(41, 2, 18, '2025-06-17 22:17:48', 'aceptada'),
(42, 2, 19, '2025-06-17 22:17:48', 'aceptada'),
(43, 2, 20, '2025-06-17 22:17:48', 'aceptada'),
(44, 2, 21, '2025-06-17 22:17:48', 'aceptada'),
(45, 2, 22, '2025-06-17 22:17:48', 'aceptada'),
(46, 2, 23, '2025-06-17 22:17:48', 'aceptada'),
(47, 2, 24, '2025-06-17 22:17:48', 'aceptada'),
(48, 2, 25, '2025-06-17 22:17:48', 'aceptada'),
(49, 3, 4, '2025-06-17 22:17:48', 'aceptada'),
(50, 3, 5, '2025-06-17 22:17:48', 'aceptada'),
(51, 3, 6, '2025-06-17 22:17:48', 'aceptada'),
(52, 3, 7, '2025-06-17 22:17:48', 'aceptada'),
(53, 3, 8, '2025-06-17 22:17:48', 'aceptada'),
(54, 3, 9, '2025-06-17 22:17:48', 'aceptada'),
(55, 3, 10, '2025-06-17 22:17:48', 'aceptada'),
(56, 3, 11, '2025-06-17 22:17:48', 'aceptada'),
(57, 3, 12, '2025-06-17 22:17:48', 'aceptada'),
(58, 3, 13, '2025-06-17 22:17:48', 'aceptada'),
(59, 3, 14, '2025-06-17 22:17:48', 'aceptada'),
(60, 3, 15, '2025-06-17 22:17:48', 'aceptada'),
(61, 3, 16, '2025-06-17 22:17:48', 'aceptada'),
(62, 3, 17, '2025-06-17 22:17:48', 'aceptada'),
(63, 3, 18, '2025-06-17 22:17:48', 'aceptada'),
(64, 3, 19, '2025-06-17 22:17:48', 'aceptada'),
(65, 3, 20, '2025-06-17 22:17:48', 'aceptada'),
(66, 3, 21, '2025-06-17 22:17:48', 'aceptada'),
(67, 3, 22, '2025-06-17 22:17:48', 'aceptada'),
(68, 3, 23, '2025-06-17 22:17:48', 'aceptada'),
(69, 3, 24, '2025-06-17 22:17:48', 'aceptada'),
(70, 3, 25, '2025-06-17 22:17:48', 'aceptada'),
(71, 4, 5, '2025-06-17 22:17:48', 'aceptada'),
(72, 4, 6, '2025-06-17 22:17:48', 'aceptada'),
(73, 4, 7, '2025-06-17 22:17:48', 'aceptada'),
(74, 4, 8, '2025-06-17 22:17:48', 'aceptada'),
(75, 4, 9, '2025-06-17 22:17:48', 'aceptada'),
(76, 4, 10, '2025-06-17 22:17:48', 'aceptada'),
(77, 4, 11, '2025-06-17 22:17:48', 'aceptada'),
(78, 4, 12, '2025-06-17 22:17:48', 'aceptada'),
(79, 4, 13, '2025-06-17 22:17:48', 'aceptada'),
(80, 4, 14, '2025-06-17 22:17:48', 'aceptada'),
(81, 4, 15, '2025-06-17 22:17:48', 'aceptada'),
(82, 4, 16, '2025-06-17 22:17:48', 'aceptada'),
(83, 4, 17, '2025-06-17 22:17:48', 'aceptada'),
(84, 4, 18, '2025-06-17 22:17:48', 'aceptada'),
(85, 4, 19, '2025-06-17 22:17:48', 'aceptada'),
(86, 4, 20, '2025-06-17 22:17:48', 'aceptada'),
(87, 4, 21, '2025-06-17 22:17:48', 'aceptada'),
(88, 4, 22, '2025-06-17 22:17:48', 'aceptada'),
(89, 4, 23, '2025-06-17 22:17:48', 'aceptada'),
(90, 4, 24, '2025-06-17 22:17:48', 'aceptada'),
(91, 4, 25, '2025-06-17 22:17:48', 'aceptada'),
(92, 5, 6, '2025-06-17 22:17:48', 'aceptada'),
(93, 5, 7, '2025-06-17 22:17:48', 'aceptada'),
(94, 5, 8, '2025-06-17 22:17:48', 'aceptada'),
(95, 5, 9, '2025-06-17 22:17:48', 'aceptada'),
(96, 5, 10, '2025-06-17 22:17:48', 'aceptada'),
(97, 5, 11, '2025-06-17 22:17:48', 'aceptada'),
(98, 5, 12, '2025-06-17 22:17:48', 'aceptada'),
(99, 5, 13, '2025-06-17 22:17:48', 'aceptada'),
(100, 5, 14, '2025-06-17 22:17:48', 'aceptada'),
(101, 5, 15, '2025-06-17 22:17:48', 'aceptada'),
(102, 5, 16, '2025-06-17 22:17:48', 'aceptada'),
(103, 5, 17, '2025-06-17 22:17:48', 'aceptada'),
(104, 5, 18, '2025-06-17 22:17:48', 'aceptada'),
(105, 5, 19, '2025-06-17 22:17:48', 'aceptada'),
(106, 5, 20, '2025-06-17 22:17:48', 'aceptada'),
(107, 5, 21, '2025-06-17 22:17:48', 'aceptada'),
(108, 5, 22, '2025-06-17 22:17:48', 'aceptada'),
(109, 5, 23, '2025-06-17 22:17:48', 'aceptada'),
(110, 5, 24, '2025-06-17 22:17:48', 'aceptada'),
(111, 5, 25, '2025-06-17 22:17:48', 'aceptada'),
(112, 6, 7, '2025-06-17 22:17:48', 'aceptada'),
(113, 6, 8, '2025-06-17 22:17:48', 'aceptada'),
(114, 6, 9, '2025-06-17 22:17:48', 'aceptada'),
(115, 6, 10, '2025-06-17 22:17:48', 'aceptada'),
(116, 6, 11, '2025-06-17 22:17:48', 'aceptada'),
(117, 6, 12, '2025-06-17 22:17:48', 'aceptada'),
(118, 6, 13, '2025-06-17 22:17:48', 'aceptada'),
(119, 6, 14, '2025-06-17 22:17:48', 'aceptada'),
(120, 6, 15, '2025-06-17 22:17:48', 'aceptada'),
(121, 6, 16, '2025-06-17 22:17:48', 'aceptada'),
(122, 6, 17, '2025-06-17 22:17:48', 'aceptada'),
(123, 6, 18, '2025-06-17 22:17:48', 'aceptada'),
(124, 6, 19, '2025-06-17 22:17:48', 'aceptada'),
(125, 6, 20, '2025-06-17 22:17:48', 'aceptada'),
(126, 6, 21, '2025-06-17 22:17:48', 'aceptada'),
(127, 6, 22, '2025-06-17 22:17:48', 'aceptada'),
(128, 6, 23, '2025-06-17 22:17:48', 'aceptada'),
(129, 6, 24, '2025-06-17 22:17:48', 'aceptada'),
(130, 6, 25, '2025-06-17 22:17:48', 'aceptada'),
(131, 7, 8, '2025-06-17 22:17:48', 'aceptada'),
(132, 7, 9, '2025-06-17 22:17:48', 'aceptada'),
(133, 7, 10, '2025-06-17 22:17:48', 'aceptada'),
(134, 7, 11, '2025-06-17 22:17:48', 'aceptada'),
(135, 7, 12, '2025-06-17 22:17:48', 'aceptada'),
(136, 7, 13, '2025-06-17 22:17:48', 'aceptada'),
(137, 7, 14, '2025-06-17 22:17:48', 'aceptada'),
(138, 7, 15, '2025-06-17 22:17:48', 'aceptada'),
(139, 7, 16, '2025-06-17 22:17:48', 'aceptada'),
(140, 7, 17, '2025-06-17 22:17:48', 'aceptada'),
(141, 7, 18, '2025-06-17 22:17:48', 'aceptada'),
(142, 7, 19, '2025-06-17 22:17:48', 'aceptada'),
(143, 7, 20, '2025-06-17 22:17:48', 'aceptada'),
(144, 7, 21, '2025-06-17 22:17:48', 'aceptada'),
(145, 7, 22, '2025-06-17 22:17:48', 'aceptada'),
(146, 7, 23, '2025-06-17 22:17:48', 'aceptada'),
(147, 7, 24, '2025-06-17 22:17:48', 'aceptada'),
(148, 7, 25, '2025-06-17 22:17:48', 'aceptada'),
(149, 8, 9, '2025-06-17 22:17:48', 'aceptada'),
(150, 8, 10, '2025-06-17 22:17:48', 'aceptada'),
(151, 8, 11, '2025-06-17 22:17:48', 'aceptada'),
(152, 8, 12, '2025-06-17 22:17:48', 'aceptada'),
(153, 8, 13, '2025-06-17 22:17:48', 'aceptada'),
(154, 8, 14, '2025-06-17 22:17:48', 'aceptada'),
(155, 8, 15, '2025-06-17 22:17:48', 'aceptada'),
(156, 8, 16, '2025-06-17 22:17:48', 'aceptada'),
(157, 8, 17, '2025-06-17 22:17:48', 'aceptada'),
(158, 8, 18, '2025-06-17 22:17:48', 'aceptada'),
(159, 8, 19, '2025-06-17 22:17:48', 'aceptada'),
(160, 8, 20, '2025-06-17 22:17:48', 'aceptada'),
(161, 8, 21, '2025-06-17 22:17:48', 'aceptada'),
(162, 8, 22, '2025-06-17 22:17:48', 'aceptada'),
(163, 8, 23, '2025-06-17 22:17:48', 'aceptada'),
(164, 8, 24, '2025-06-17 22:17:48', 'aceptada'),
(165, 8, 25, '2025-06-17 22:17:48', 'aceptada'),
(166, 9, 10, '2025-06-17 22:17:48', 'aceptada'),
(167, 9, 11, '2025-06-17 22:17:48', 'aceptada'),
(168, 9, 12, '2025-06-17 22:17:48', 'aceptada'),
(169, 9, 13, '2025-06-17 22:17:48', 'aceptada'),
(170, 9, 14, '2025-06-17 22:17:48', 'aceptada'),
(171, 9, 15, '2025-06-17 22:17:48', 'aceptada'),
(172, 9, 16, '2025-06-17 22:17:48', 'aceptada'),
(173, 9, 17, '2025-06-17 22:17:48', 'aceptada'),
(174, 9, 18, '2025-06-17 22:17:48', 'aceptada'),
(175, 9, 19, '2025-06-17 22:17:48', 'aceptada'),
(176, 9, 20, '2025-06-17 22:17:48', 'aceptada'),
(177, 9, 21, '2025-06-17 22:17:48', 'aceptada'),
(178, 9, 22, '2025-06-17 22:17:48', 'aceptada'),
(179, 9, 23, '2025-06-17 22:17:48', 'aceptada'),
(180, 9, 24, '2025-06-17 22:17:48', 'aceptada'),
(181, 9, 25, '2025-06-17 22:17:48', 'aceptada'),
(182, 10, 11, '2025-06-17 22:17:48', 'aceptada'),
(183, 10, 12, '2025-06-17 22:17:48', 'aceptada'),
(184, 10, 13, '2025-06-17 22:17:48', 'aceptada'),
(185, 10, 14, '2025-06-17 22:17:48', 'aceptada'),
(186, 10, 15, '2025-06-17 22:17:48', 'aceptada'),
(187, 10, 16, '2025-06-17 22:17:48', 'aceptada'),
(188, 10, 17, '2025-06-17 22:17:48', 'aceptada'),
(189, 10, 18, '2025-06-17 22:17:48', 'aceptada'),
(190, 10, 19, '2025-06-17 22:17:48', 'aceptada'),
(191, 10, 20, '2025-06-17 22:17:48', 'aceptada'),
(192, 10, 21, '2025-06-17 22:17:48', 'aceptada'),
(193, 10, 22, '2025-06-17 22:17:48', 'aceptada'),
(194, 10, 23, '2025-06-17 22:17:48', 'aceptada'),
(195, 10, 24, '2025-06-17 22:17:48', 'aceptada'),
(196, 10, 25, '2025-06-17 22:17:48', 'aceptada'),
(197, 11, 12, '2025-06-17 22:17:48', 'aceptada'),
(198, 11, 13, '2025-06-17 22:17:48', 'aceptada'),
(199, 11, 14, '2025-06-17 22:17:48', 'aceptada'),
(200, 11, 15, '2025-06-17 22:17:48', 'aceptada'),
(201, 11, 16, '2025-06-17 22:17:48', 'aceptada'),
(202, 11, 17, '2025-06-17 22:17:48', 'aceptada'),
(203, 11, 18, '2025-06-17 22:17:48', 'aceptada'),
(204, 11, 19, '2025-06-17 22:17:48', 'aceptada'),
(205, 11, 20, '2025-06-17 22:17:48', 'aceptada'),
(206, 11, 21, '2025-06-17 22:17:48', 'aceptada'),
(207, 11, 22, '2025-06-17 22:17:48', 'aceptada'),
(208, 11, 23, '2025-06-17 22:17:48', 'aceptada'),
(209, 11, 24, '2025-06-17 22:17:48', 'aceptada'),
(210, 11, 25, '2025-06-17 22:17:48', 'aceptada'),
(211, 12, 13, '2025-06-17 22:17:48', 'aceptada'),
(212, 12, 14, '2025-06-17 22:17:48', 'aceptada'),
(213, 12, 15, '2025-06-17 22:17:48', 'aceptada'),
(214, 12, 16, '2025-06-17 22:17:48', 'aceptada'),
(215, 12, 17, '2025-06-17 22:17:48', 'aceptada'),
(216, 12, 18, '2025-06-17 22:17:48', 'aceptada'),
(217, 12, 19, '2025-06-17 22:17:48', 'aceptada'),
(218, 12, 20, '2025-06-17 22:17:48', 'aceptada'),
(219, 12, 21, '2025-06-17 22:17:48', 'aceptada'),
(220, 12, 22, '2025-06-17 22:17:48', 'aceptada'),
(221, 12, 23, '2025-06-17 22:17:48', 'aceptada'),
(222, 12, 24, '2025-06-17 22:17:48', 'aceptada'),
(223, 12, 25, '2025-06-17 22:17:48', 'aceptada'),
(224, 13, 14, '2025-06-17 22:17:48', 'aceptada'),
(225, 13, 15, '2025-06-17 22:17:48', 'aceptada'),
(226, 13, 16, '2025-06-17 22:17:48', 'aceptada'),
(227, 13, 17, '2025-06-17 22:17:48', 'aceptada'),
(228, 13, 18, '2025-06-17 22:17:48', 'aceptada'),
(229, 13, 19, '2025-06-17 22:17:48', 'aceptada'),
(230, 13, 20, '2025-06-17 22:17:48', 'aceptada'),
(231, 13, 21, '2025-06-17 22:17:48', 'aceptada'),
(232, 13, 22, '2025-06-17 22:17:48', 'aceptada'),
(233, 13, 23, '2025-06-17 22:17:48', 'aceptada'),
(234, 13, 24, '2025-06-17 22:17:48', 'aceptada'),
(235, 13, 25, '2025-06-17 22:17:48', 'aceptada'),
(236, 14, 15, '2025-06-17 22:17:48', 'aceptada'),
(237, 14, 16, '2025-06-17 22:17:48', 'aceptada'),
(238, 14, 17, '2025-06-17 22:17:48', 'aceptada'),
(239, 14, 18, '2025-06-17 22:17:48', 'aceptada'),
(240, 14, 19, '2025-06-17 22:17:48', 'aceptada'),
(241, 14, 20, '2025-06-17 22:17:48', 'aceptada'),
(242, 14, 21, '2025-06-17 22:17:48', 'aceptada'),
(243, 14, 22, '2025-06-17 22:17:48', 'aceptada'),
(244, 14, 23, '2025-06-17 22:17:48', 'aceptada'),
(245, 14, 24, '2025-06-17 22:17:48', 'aceptada'),
(246, 14, 25, '2025-06-17 22:17:48', 'aceptada'),
(247, 15, 16, '2025-06-17 22:17:48', 'aceptada'),
(248, 15, 17, '2025-06-17 22:17:48', 'aceptada'),
(249, 15, 18, '2025-06-17 22:17:48', 'aceptada'),
(250, 15, 19, '2025-06-17 22:17:48', 'aceptada'),
(251, 15, 20, '2025-06-17 22:17:48', 'aceptada'),
(252, 15, 21, '2025-06-17 22:17:48', 'aceptada'),
(253, 15, 22, '2025-06-17 22:17:48', 'aceptada'),
(254, 15, 23, '2025-06-17 22:17:48', 'aceptada'),
(255, 15, 24, '2025-06-17 22:17:48', 'aceptada'),
(256, 15, 25, '2025-06-17 22:17:48', 'aceptada'),
(257, 16, 17, '2025-06-17 22:17:48', 'aceptada'),
(258, 16, 18, '2025-06-17 22:17:48', 'aceptada'),
(259, 16, 19, '2025-06-17 22:17:48', 'aceptada'),
(260, 16, 20, '2025-06-17 22:17:48', 'aceptada'),
(261, 16, 21, '2025-06-17 22:17:48', 'aceptada'),
(262, 16, 22, '2025-06-17 22:17:48', 'aceptada'),
(263, 16, 23, '2025-06-17 22:17:48', 'aceptada'),
(264, 16, 24, '2025-06-17 22:17:48', 'aceptada'),
(265, 16, 25, '2025-06-17 22:17:48', 'aceptada'),
(266, 17, 18, '2025-06-17 22:17:48', 'aceptada'),
(267, 17, 19, '2025-06-17 22:17:48', 'aceptada'),
(268, 17, 20, '2025-06-17 22:17:48', 'aceptada'),
(269, 17, 21, '2025-06-17 22:17:48', 'aceptada'),
(270, 17, 22, '2025-06-17 22:17:48', 'aceptada'),
(271, 17, 23, '2025-06-17 22:17:48', 'aceptada'),
(272, 17, 24, '2025-06-17 22:17:48', 'aceptada'),
(273, 17, 25, '2025-06-17 22:17:48', 'aceptada'),
(274, 18, 19, '2025-06-17 22:17:48', 'aceptada'),
(275, 18, 20, '2025-06-17 22:17:48', 'aceptada'),
(276, 18, 21, '2025-06-17 22:17:48', 'aceptada'),
(277, 18, 22, '2025-06-17 22:17:48', 'aceptada'),
(278, 18, 23, '2025-06-17 22:17:48', 'aceptada'),
(279, 18, 24, '2025-06-17 22:17:48', 'aceptada'),
(280, 18, 25, '2025-06-17 22:17:48', 'aceptada'),
(281, 19, 20, '2025-06-17 22:17:48', 'aceptada'),
(282, 19, 21, '2025-06-17 22:17:48', 'aceptada'),
(283, 19, 22, '2025-06-17 22:17:48', 'aceptada'),
(284, 19, 23, '2025-06-17 22:17:48', 'aceptada'),
(285, 19, 24, '2025-06-17 22:17:48', 'aceptada'),
(286, 19, 25, '2025-06-17 22:17:48', 'aceptada'),
(287, 20, 21, '2025-06-17 22:17:48', 'aceptada'),
(288, 20, 22, '2025-06-17 22:17:48', 'aceptada'),
(289, 20, 23, '2025-06-17 22:17:48', 'aceptada'),
(290, 20, 24, '2025-06-17 22:17:48', 'aceptada'),
(291, 20, 25, '2025-06-17 22:17:48', 'aceptada'),
(292, 21, 22, '2025-06-17 22:17:48', 'aceptada'),
(293, 21, 23, '2025-06-17 22:17:48', 'aceptada'),
(294, 21, 24, '2025-06-17 22:17:48', 'aceptada'),
(295, 21, 25, '2025-06-17 22:17:48', 'aceptada'),
(296, 22, 23, '2025-06-17 22:17:48', 'aceptada'),
(297, 22, 24, '2025-06-17 22:17:48', 'aceptada'),
(298, 22, 25, '2025-06-17 22:17:48', 'aceptada'),
(299, 23, 24, '2025-06-17 22:17:48', 'aceptada'),
(300, 23, 25, '2025-06-17 22:17:48', 'aceptada'),
(301, 24, 25, '2025-06-17 22:17:48', 'aceptada'),
(306, 1, 26, '2025-06-18 00:00:00', 'pendiente');

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
(3, 3, '2025-06-06', 'Tercera Publicación', 'imagen3.png', 'Este es el contenido de la tercera publicación.'),
(4, 1, '2025-06-16', 'Master of the world', '', 'Estoy preparando una campaña épica de Dungeons & Dragons para un grupo de aventureros valientes (y tal vez un poco ambiciosos). El mundo está al borde del colapso: los dioses han desaparecido, los reinos pelean por el control, y antiguos secretos están saliendo a la luz.\n\nLa premisa: existe un artefacto legendario, el Trono del Mundo, dividido en fragmentos perdidos en lugares peligrosos y olvidados. Quien los reúna... tendrá el poder de moldear el mundo a su voluntad.\n\n🧭 Exploración\n🗡️ Combate épico\n🤐 Intriga política\n😈 ¿Salvar el mundo… o conquistarlo?\n\nBusco jugadores que quieran sumergirse en una historia de decisiones difíciles, alianzas traicioneras y tentaciones de poder absoluto. ¿Te atreves a jugar?\n\n💬 Mándame mensaje si te interesa unirte.');

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
(1, 'Andrei', 'andrei@gmail.com', '2000-05-19', '$2b$12$BuLUisW0.pXf1ot3f9ETGujUTNp1Ym8vscDJeSszBIFNFMYLLHdsW', 'Admin', 0, 'assets/images/placeholder.png'),
(2, 'Miguel', 'miguel@gmail.com', '2025-05-23', '$2b$12$2jNjH0o.YpCxvRrA6tYUA.QAjOHmIEVVv8twEWGe6JpkbYVO5f1.e', 'Usuario', 0, 'assets/images/placeholder.png'),
(3, 'Maffi', 'maffi@gmail.com', '2025-02-05', '$2b$12$sNtrsbVWmcUExaa86tFcgOdoxz4U9SsNye68UOmzE8ZHa9VYXLb.e', 'Usuario', 0, 'assets/images/placeholder.png'),
(4, 'Bruno', 'bruno@gmail.com', '2018-03-01', '$2b$12$Gp5Kn.tPYiyOINTmK8mlIOnVoE1vw9KkIYAD/wUgavEtTeR7xW5Z2', 'Usuario', 0, 'assets/images/placeholder.png'),
(5, 'Karla', 'karla@gmail.com', '2016-03-03', '$2b$12$DkZwGVGHeWc9mP1X8DdEVeLrOYQ9miESgGmMxWxfkWLRKBborXES2', 'Usuario', 0, 'assets/images/placeholder.png'),
(6, 'Marcos', 'marcos@gmail.com', '2025-06-02', '$2b$12$s57N/0w7IZN8LOzlLJSOGO8LUzC6f.2p1EtfxjvTxurEvW2sTBMvK', 'Usuario', 0, 'assets/images/placeholder.png'),
(7, 'Alice Johnson', 'alice.j@example.com', '1990-01-15', 'hashed_password_1', 'Usuario', 0, NULL),
(8, 'Bob Williams', 'bob.w@example.com', '1985-03-22', 'hashed_password_2', 'Usuario', 0, NULL),
(9, 'Charlie Brown', 'charlie.b@example.com', '1992-07-01', 'hashed_password_3', 'Usuario', 0, NULL),
(10, 'Diana Prince', 'diana.p@example.com', '1988-11-30', 'hashed_password_4', 'Admin', 0, NULL),
(11, 'Ethan Hunt', 'ethan.h@example.com', '1995-09-10', 'hashed_password_5', 'Usuario', 0, NULL),
(12, 'Fiona Glenn', 'fiona.g@example.com', '1993-02-14', 'hashed_password_6', 'Usuario', 0, NULL),
(13, 'George Costanza', 'george.c@example.com', '1980-04-25', 'hashed_password_7', 'Usuario', 0, NULL),
(14, 'Hannah Abbott', 'hannah.a@example.com', '1998-06-05', 'hashed_password_8', 'Usuario', 0, NULL),
(15, 'Ivy Green', 'ivy.g@example.com', '1991-08-19', 'hashed_password_9', 'Usuario', 0, NULL),
(16, 'Jack Sparrow', 'jack.s@example.com', '1975-12-03', 'hashed_password_10', 'Admin', 0, NULL),
(17, 'Karen Smith', 'karen.s@example.com', '1987-10-08', 'hashed_password_11', 'Usuario', 0, NULL),
(18, 'Liam Neeson', 'liam.n@example.com', '1970-01-01', 'hashed_password_12', 'Usuario', 0, NULL),
(19, 'Mia Wallace', 'mia.w@example.com', '1994-03-17', 'hashed_password_13', 'Usuario', 0, NULL),
(20, 'Noah Black', 'noah.b@example.com', '1989-05-29', 'hashed_password_14', 'Usuario', 0, NULL),
(21, 'Olivia White', 'olivia.w@example.com', '1996-07-11', 'hashed_password_15', 'Usuario', 0, NULL),
(22, 'Peter Parker', 'peter.p@example.com', '2000-08-04', 'hashed_password_16', 'Usuario', 0, NULL),
(23, 'Quinn Fabray', 'quinn.f@example.com', '1997-09-21', 'hashed_password_17', 'Usuario', 0, NULL),
(24, 'Rachel Green', 'rachel.g@example.com', '1986-11-02', 'hashed_password_18', 'Usuario', 0, NULL),
(25, 'Steve Rogers', 'steve.r@example.com', '1920-07-04', 'hashed_password_19', 'Admin', 0, NULL),
(26, 'Tina Belcher', 'tina.b@example.com', '2001-02-28', 'hashed_password_20', 'Usuario', 0, NULL),
(27, 'Victor Gomez', 'victor.g@example.com', '1990-05-12', 'hashed_password_26', 'Usuario', 0, NULL),
(28, 'Wendy Davis', 'wendy.d@example.com', '1991-07-23', 'hashed_password_27', 'Usuario', 0, NULL),
(29, 'Xavier Martinez', 'xavier.m@example.com', '1988-09-01', 'hashed_password_28', 'Usuario', 0, NULL),
(30, 'Yara Rodriguez', 'yara.r@example.com', '1995-04-18', 'hashed_password_29', 'Usuario', 0, NULL),
(31, 'Zackary Wilson', 'zackary.w@example.com', '1987-06-29', 'hashed_password_30', 'Admin', 0, NULL),
(32, 'Amelia Clark', 'amelia.c@example.com', '1993-01-05', 'hashed_password_31', 'Usuario', 0, NULL),
(33, 'Benjamin Lewis', 'benjamin.l@example.com', '1984-03-14', 'hashed_password_32', 'Usuario', 0, NULL),
(34, 'Chloe Hall', 'chloe.h@example.com', '1996-10-25', 'hashed_password_33', 'Usuario', 0, NULL),
(35, 'Daniel King', 'daniel.k@example.com', '1982-12-07', 'hashed_password_34', 'Usuario', 0, NULL),
(36, 'Ella Wright', 'ella.w@example.com', '1999-02-11', 'hashed_password_35', 'Usuario', 0, NULL);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=307;

--
-- AUTO_INCREMENT de la tabla `Chats`
--
ALTER TABLE `Chats`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Comentarios`
--
ALTER TABLE `Comentarios`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

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
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `Publicacion_Reaccion`
--
ALTER TABLE `Publicacion_Reaccion`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Usuarios`
--
ALTER TABLE `Usuarios`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

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
