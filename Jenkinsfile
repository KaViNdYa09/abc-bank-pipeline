pipeline {
    // Run this pipeline on any available Jenkins agent
    agent any
    
    // Define environment variables to use in the pipeline
    environment {
        // --- !!! CHANGE THIS LINE !!! ---
        EC2_IP = '13.159.190.186' // Replace with your EC2's public IP
        
        // These must match your file names
        ANSIBLE_INVENTORY = 'ansible/inventory.yml'
        ANSIBLE_PLAYBOOK = 'ansible/deploy.yml'
    }
    
    stages {
        // Stage 1: Get the code from GitHub
        stage('Checkout') {
            steps {
                echo '📥 Checking out code from GitHub...'
                // 'checkout scm' automatically uses the Git repo and
                // credentials you set in the Jenkins job.
                checkout scm
            }
        }
        
        // Stage 2: Validate the files exist
        stage('Validate Files') {
            steps {
                echo '✅ Validating deployment files...'
                sh '''
                    ls -la
                    echo "--- Ansible Playbook ---"
                    cat ${ANSIBLE_PLAYBOOK}
                '''
            }
        }
        
        // Stage 3: Run Ansible to deploy the app
        stage('Deploy to EC2 with Ansible') {
            steps {
                echo "🚀 Deploying to EC2 (${EC2_IP})..."
                sh '''
                    # This runs your Ansible playbook
                    ansible-playbook -i ${ANSIBLE_INVENTORY} ${ANSIBLE_PLAYBOOK}
                '''
            }
        }
        
        // Stage 4: Wait and verify the app is running
        stage('Verify Deployment') {
            steps {
                echo '🏥 Verifying deployment...'
                sh '''
                    echo "Waiting for 10 seconds for container to start..."
                    sleep 10
                    
                    # This pings your app. If it fails, the pipeline fails.
                    echo "Pinging health check endpoint..."
                    curl -f http://${EC2_IP}:3001/api/health
                '''
            }
        }
    }
    
    // Post-build actions: These run after all stages
    post {
        success {
            echo '✅ Deployment to EC2 successful!'
            echo "🎉 Application live at http://${EC2_IP}:3001"
        }
        failure {
            echo '❌ Deployment failed!'
            echo 'Check the console output and Ansible logs for details.'
        }
    }
}
