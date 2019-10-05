'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON, test3' }
})

Route.get('/hola', () => {
  return { greeting: 'Hello' }
})

Route
  .group(() => {
    Route.post('auth/register', 'AuthController.register').validator('StoreUser')
    Route.post('auth/login', 'AuthController.login').validator('LoginUser')


    //* LocationsRoute
    Route.resource('location', 'LocationController')

    //* LocationsRoute
    Route.resource('user', 'UserController')
  })
  .prefix('api')