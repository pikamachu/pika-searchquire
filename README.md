# Searchquire

[![Version](https://img.shields.io/npm/v/searchquire.svg)](https://npmjs.org/package/searchquire)
[![Build Status](https://travis-ci.org/pikamachu/pika-searchquire.svg?branch=master)](https://travis-ci.org/pikamachu/pika-searchquire)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/7a5d465f487e4f55a8e50e8201cc69b1)](https://www.codacy.com/project/antonio.marin.jimenez/pika-searchquire/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=pikamachu/pika-searchquire&amp;utm_campaign=Badge_Grade_Dashboard)
[![codecov](https://codecov.io/gh/pikamachu/pika-searchquire/branch/master/graph/badge.svg)](https://codecov.io/gh/pikamachu/pika-searchquire)

<a href='https://ko-fi.com/Q5Q21TCUG' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://cdn.ko-fi.com/cdn/kofi1.png?v=2' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>

## Introduction

Searchquire easily allows to recursively override scripts dependencies during testing using configurable search patterns to locate reusable stubs and mocks.

## Installing / Getting started

To install the package execute:

```shell
npm install searchquire --save-dev
```

## Usage

### Simple examples

Resolve a module using a basePath where module is found as parameter.

```js
var searchquire = require('searchquire');

var foo = searchquire('foo', {
  basePath: './simple-example/samples'
});
```

Resolve a module using a mock location to resolve dependencies.

```js
var searchquire = require('searchquire');

var foo = searchquire('foo', {
  basePath: './simple-example/samples',
  modulePaths: [{
    basePath: './simple-example/mocks',
    fileSuffix: 'Mock.js'
  }]
});
```

Resolve a module using a mock location to resolve dependencies with a string require pattern.

```js
var searchquire = require('searchquire');

var foo = searchquire('foo', {
  basePath: './simple-example/samples',
  modulePaths: [{
    basePath: './simple-example/mocks',
    fileSuffix: 'Mock',
    pattern: './*'
  }]
});
```

Resolve a module using stubs to resolve dependencies.

```js
var searchquire = require('searchquire');

var foo = searchquire('foo', {
  basePath: './simple-example/samples',
  moduleStubs: {
    'path': {
      basename: function() {
        return 'BASSTUB';
      }
    }
  }
});
```

See tests for more examples and details.

### Complex examples

Resolve a module using a path alias.

```js
var searchquire = require('searchquire');

var foo = searchquire('foo', {
  basePath: './complex-example/samples',
  pattern: '(pathAlias)/*',
  patternAlias: './opinionated/folder/hierarchy/with/many/levels'
});
```

Resolve a module using an array of path alias and stubs with regex pattern to resolve dependencies with logging enabled.

```js
var searchquire = require('searchquire');

var qux = searchquire('qux', {
  basePath: './complex-example/samples',
  baseModulePaths: [
    {
      name: 'alias-path',
      pattern: /^(pathAlias)\/.*/,
      patternAlias: './opinionated/folder/hierarchy/with/many/levels'
    },
    {
      name: 'another-alias-path',
      pattern: /^(anotherPathAlias)\/.*/,
      patternAlias: './another/opinionated/folder/hierarchy/with/many/levels'
    }
  ],
  moduleStubs: [
    {
      name: 'stub-zab',
      pattern: /.*\/zab/,
      stub: {
        zab: function() {
          return 'zabstub';
        }
      }
    }
  ],
  logLevel: 1,
  logElapseTime: true
});
```

See tests for more examples and details.

### Salesforce Commerce Cloud SFRA examples

Resolve a dw api mock.

```js
var searchquire = require('searchquire');

var CustomerMock = searchquire('dw/customer/Customer', {
  basePath: './sfra-example/mocks/dw-api-mock'
});
```

Resolve a cartridge script using mocks folders with file suffix and require patterns for cartridge scripts and dw api.

```js
var searchquire = require('searchquire');

var orderHelpersTest = searchquire('*/cartridge/scripts/order/orderHelpers', {
  basePath: './sfra-example/project/cartridges/storefront/cartridge',
  pattern: '*/cartridge/(.*)',
  modulePaths: [
    {
      name: 'storefront-mock',
      basePath: './sfra-example/mocks/storefront-mock',
      fileSuffix: 'Mock',
      pattern: '*/cartridge/(.*)'
    },
    {
      name: 'dw-mock',
      basePath: './sfra-example/mocks/dw-api-mock',
      pattern: 'dw/*'
    }
  ]
});
```

See tests for more examples and details.

## Developing

### Built with

* [n-readlines](https://github.com/nacholibre/node-readlines)
* [proxyquire](https://github.com/thlorenz/proxyquire)
* [resolve](https://github.com/browserify/resolve)

### Folder structure

* root: Contains the README.md, the main configuration to execute the project such as package.json or any other configuration files.
* lib: Contains the source code for application script.
* test: Contains library tests and examples.
* node_modules: Contains third party JS libraries used in this project

### Setting up Dev

Download the code

```shell
git clone https://github.com/pikamachu/pika-searchquire.git
cd pika-searchquire
```

Install dependencies

```shell
bash pika install
```

Run application tests.

```shell
bash pika test
```
