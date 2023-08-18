# Surplus-Task

Made with React Native

Tech Features:
1. React Native0.72.3
2. Typescript 4.8.4
3. React Navigation 
4. React Native Vector Icons --> i'm use to display icons
5. React Native Fast Image --> i'm use to display image
6. Recoil --> i'm use to state manegement

## Hooks and APIs Implementation
- [X] useCallback i'm use on this file `App/screens/Home/components/PokemonListHome.tsx`
- [X] useEffect
- [X] useRef i'm use on this file `App.tsx`
- [X] useState
- [X] memo --> i'm use on this file `App/screens/Home/components/PokemonItem.tsx`
- [X] lazy --> i'm use on this file `App/screens/Home/index.tsx`

## Setup Environment
First, setup your environment by following this guide on https://reactnative.dev/docs/environment-setup

## Clone Project
```
git clone
cd 
npm install
```

## Structure

```
App
├── assets
│   ├── icon // for icon storage
│   └── image // for image storage. ex : png, jeg, etc
├── fetchApi // for adapter when hit API
├── helper
|   ├── typeColor 
│   └── navigation
├── hook
├── navigation
├── recoil
├── screens
│   ├── Detail
│   └── Home
│   └── Splash
├── theme // for global style on app
├── uikit
│   └── Header
│   └── Icon
│   └── Spinner
│   └── Text
```

## Testing
We have two kind of test: unit test and snapshot test.
For unit test and snapshot, we will use `jest` with react native.

Every unit test must be placed under corresponding feature you want to add test and create `__test__` folder.
Every component should have snapshot test.

if you want to running unit testing, you can run this command `npm run test`

## Icon & Image
We use icomoon for converting svg icon into `.ttf` so you don't need to use png file for icon.
Icomoon can be accessed here: https://icomoon.io/

## Feature on App
### Pokémon List Page
- [X] it has list of Pokémon
- [X] it can be searched by its name
- [X] contain infinity scroll
- [X] it has 2 column for each row
- [X] get 8 Pokémon every fetch new page

### Detail Pokémon Page
- [X] it has information sprites front, back & shiny
- [X] it has information height & weight
- [X] it has information types
- [] it has information chain evolve
- [] it has information move max 10

## Additional Requirement
### Pokémon List Page
- [X] You must use React Native
- [X] You must use typescript
- [X] You must obtain data from https://pokeapi.co/docs/v2 using API call
- [X] You must NOT use utility library such as lodash, ramda, etc,
- [X] You must create one reusable custom hooks (This File `App/hook`)
- [X] You must use a navigation library
- [X] You must use recoil as state management library (This File `App/recoil`)
- [X] You must minimized render times
- [X] You must add unit test for component and function 

### List Testing Coverage
| Type Testing | Location FIle |
| ----------------------- | ----------------------------------- |
| Snapshoot Test | App/uikit/*|
| Function Test | App/helper/typeColor |

## Bonus Point (Import optimization)
1. First for Import Optimized i'am using this patter when import library like this external  and internal libraries on the project imports , example import on this file `App/screens/Home/index.tsx`
```
// system import
import React, {Suspense, lazy, useCallback, useEffect} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

// external import
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useRecoilState} from 'recoil';

// owner component from this feature
import HomeHeader from './components/HomeHeader';

// global image
import {ICON_SEARCH} from '../../assets/icon';

// helper for external libraries
import listDataFilter from '../../recoil/getDataFilter';
import listData from '../../recoil/getData';
import pageData from '../../recoil/getPage';

// hook or api
import useComposeData from '../../hook/useComposeData';
import getPokemonList from '../../fetchApi/getPokemonList';

// global uikit or theme
import Text from '../../uikit/Text';
import Icon from '../../uikit/Icon';
import Spinner from '../../uikit/Spinner';
import Colors from '../../theme/colors';
import Fonts from '../../theme/fonts';
import AppStyles from '../../theme/appStyles';

// existing code
```
2. Secondly for Import Optimized use React.lazy, purpose is use `lazy` not to render this component until it promises this component is ready, so until it waits for this component to finish rendering, the component will show a callback from suspend

## Video Demo
Look vidoe demo this link https://www.awesomescreenshot.com/video/19859586?key=ce30d59a3261e680c2c307d0fda790a2
