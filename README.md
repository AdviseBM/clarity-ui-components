### ✌ Welcome!

These is a package created for centralizing the advise system UI components 😄

### 🛠 Installation

You can install these package using when testing the changes made on the new system ```npm install git+ssh://git@github.com:Andrinoid/adviseTable.git --legacy-peer-deps --force```

If you have finished your changes, it's important to create a new release of it's associated tag, you can do it here:

<br /> 
1. First go to the tags management page clicking here: <br />
<img alt="instruction-1" title="instruction-1" src=".github/assets/instruction-1.png" width="400px" />

<br /> 
2. After that you will need to create a new release for it: <br />
<img alt="instruction-2" title="instruction-2" src=".github/assets/instruction-2.png" width="200px" />

<br />
3. After that define your tag name: <br />
<img alt="instruction-3" title="instruction-3" src=".github/assets/instruction-3.png" width="400px" />

<br />
4. Then fill your release name and press "Publish Release" <br />
<img alt="instruction-4" title="instruction-4" src=".github/assets/instruction-4.png" width="800px" />

Then you should be able to install the package using ```npm install git+ssh://git@github.com:Andrinoid/adviseTable.git#v1.0.0 --legacy-peer-deps --force```

### 💻 Configuration

You can run the code using ```npm run start```, don't forget of installing the dependencies before using ```npm install```, there you will have a place to visually test the package code that you are developing.

It's important to notice that only the code exported on the build entrypoint defined on 
```rollup.config.js``` ```input: 'src/Table/index.js'``` will be builded and exported by the package.
