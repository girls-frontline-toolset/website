module.exports =  {
  "setupFiles": [
    "<rootDir>/test/common/config.js"
  ]
  ,
  "moduleFileExtensions": [
    "js",
    "vue"
  ],
    "moduleNameMapper": {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  "transform": {
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
      ".*\\.(vue)$": "<rootDir>/node_modules/vue-jest"
  },
  "snapshotSerializers": [
    "<rootDir>/node_modules/jest-serializer-vue"
  ],
  "testURL":"http://127.0.0.1"
};

var a

