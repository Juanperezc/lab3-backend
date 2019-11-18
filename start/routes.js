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
  return { greeting: 'Hello world in JSON, test 5' }
})

Route.get('/hola', () => {
  return { greeting: 'Hello' } })

//Route.resource('categorys', 'CategoryController')


Route
  .group(() => {
    Route.post('auth/register', 'AuthController.register').validator('StoreUser')
    Route.post('auth/login', 'AuthController.login').validator('LoginUser')

    //* LocationRoutes
    Route.resource('locations', 'LocationController')

    //* UserRoutes

    Route.resource('users', 'UserController').
    validator(new Map([
      ['users.update', 'UpdateUser']
    ]))
    .apiOnly().only(['index', 'show', 'update']).middleware(['auth'])

    Route
    .get('user/me', 'UserController.me').as('user.me')
    .middleware('auth')

    Route
    .post('user/upload_photo', 'UserController.upload_photo')
    .as('user.upload_photo')
    .middleware('auth')

    Route
    .put('user/banned/:id', 'UserController.banned').middleware(['auth'])

    //* PublicationRoutes
    Route.resource('publications', 'PublicationController').middleware('auth')

    Route.post('publication/like', 'PublicationController.like').as('publication.like').validator('PublicationExists')

    Route.post('publication/share', 'PublicationController.share').as('publication.share').validator('PublicationExists')

    //* CommentaryRoutes
    Route.resource('commentaries', 'CommentaryController')
    .validator(new Map([
      ['commentaries.store', 'StoreCommentary']
    ]))
    .apiOnly().only(['index','store', 'show', 'update']).middleware(['auth'])

    Route.post('commentary/like', 'CommentaryController.like').as('commentary.like').validator('CommentaryLike')
  
  
    //* CategoryRoutes
    Route.resource('categorys', 'CategoryController').middleware(['auth'])

  })
  .prefix('api')

  Route
  .group(() => {

    Route
    .get('user/me', 'UserController.me').as('user.me')
    .middleware('auth')

  }).prefix('files')
