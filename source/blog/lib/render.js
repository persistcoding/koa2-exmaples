/**
 * Module dependencies.
 */

 import views from 'co-views'
 import path from 'path'


 // setup views mapping .html
 // to the swig template engine

 const pages = path.join(__dirname, '/../views')

 export default views(pages, {map: {html: 'swig'}})
