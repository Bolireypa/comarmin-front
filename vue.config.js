module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: 'https://comarminapp.herokuapp.com/api/v1/'
  }
}
