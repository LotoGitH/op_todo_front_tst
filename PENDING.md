# PENDING.md — Funcionalidades pendientes para la siguiente iteración

## Frontend

- [ ] Sidebar izquierdo funcional con vistas: Hoy, Próximos 7 días, Todas, por Etiqueta
- [ ] Filtro por status en la lista de tareas
- [ ] Ordenamiento: por fecha, por título, por status
- [ ] Vista de tareas completadas (actualmente ocultas)
- [ ] Animaciones de entrada/salida en el panel de detalle
- [ ] Paginación o scroll infinito para listas largas
- [ ] Modo claro / oscuro (toggle)
- [ ] Indicador visual de carga global (interceptor HTTP)
- [ ] Manejo de errores HTTP con notificaciones toast
- [ ] Atajos de teclado (Esc para cerrar, Enter para guardar)
- [ ] Drag & drop para reordenar tareas
- [ ] Responsive / mobile view

## Backend

- [ ] Autenticación JWT (login/register)
- [ ] Paginación en GET /todos
- [ ] Filtros por status y fecha en GET /todos
- [ ] Restore (des-eliminar) una tarea soft-deleted
- [ ] Endpoint GET /todos/deleted para ver eliminados
- [ ] Validación estricta de fechas futuras en targetDate
- [ ] Rate limiting con @nestjs/throttler
- [ ] Swagger/OpenAPI docs con @nestjs/swagger
- [ ] Tests unitarios de servicio (Jest)
- [ ] Tests e2e con Supertest

## Infraestructura

- [ ] Dockerizar backend + PostgreSQL (docker-compose)
- [ ] Variables de entorno validadas con @nestjs/config + Joi
- [ ] CI/CD con GitHub Actions (build + test en cada PR)
- [ ] Deploy en VPS con Nginx + PM2 + SSL (Certbot)
- [ ] Dominio personalizado configurado en Namecheap
