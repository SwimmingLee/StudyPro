// import fs from 'fs'
module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    https:true,
    // https: {
    //   key: fs.readFileSync('./keys/localhost/private.key'),
    //   cert: fs.readFileSync('./keys/localhost/certificate.crt'),
    //   ca: fs.readFileSync('./keys/localhost/ca_bundle.crt'),
    // },
    public: 'https://localhost:8080/'
  }
}