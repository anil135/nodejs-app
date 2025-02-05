pipeline {
    agent any

    
    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from the repository
                git branch: 'main', url: 'https://github.com/anil135/nodejs-app.git'
            }
        }

    stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm build'
            }
        }

    stage('Test') {
            steps {
                sh 'npm test --coverage'
            }
        }     
    }
}
