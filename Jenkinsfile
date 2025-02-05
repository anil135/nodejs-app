pipeline {
    agent any

    
    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from the repository
                git branch: 'main', url: 'https://github.com/anil135/nodejs-app.git'
            }
        }

        environment {
        PATH = "$HOME/.nvm/versions/node/v20.14.0/bin:$PATH"
        }
        
        stage('Build') {
                steps {
                    sh 'which node'
                    sh 'which npm'
                    sh 'node -v'  
                    sh 'npm -v'
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
    
        stage('Test') {
                steps {
                    sh 'npm test --coverage'
            }
        }     
    }
}
