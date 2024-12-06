#### **Main Branch**

- The `main` branch always contains production-ready code.

#### **Feature Branches**

- Each developer works on a **feature branch** created from the `main` branch.
- Feature branches are merged back into `main` only when they are complete, tested, and reviewed.

---

### **Pull Process**

1. **Start a Feature Branch**:
    
    - Before starting work, pull the latest updates from the `main` branch to ensure your branch starts with the most up-to-date code.
        
        ```bash
        git checkout main
        git pull origin main
        git checkout -b feature/<feature-name>
        ```
        
2. **Work on the Feature**:
    
    - Commit your changes incrementally with clear and meaningful commit messages:
        
        ```bash
        git add .
        git commit -m "Add login feature with JWT"
        ```
        
3. **Push Your Feature Branch**:
    
    - Push the feature branch to the remote repository:
        
        ```bash
        git push origin feature/<feature-name>
        ```
        
4. **Create a Pull Request (PR)**:
    
    - Navigate to GitHub and create a pull request from your feature branch to `main`.
    - Provide a clear title and description of what your PR does.

---

### **Merge Process**

1. **Code Review**:
    
    - Team members review the pull request.
    - Address any requested changes:
        
        ```bash
        git add .
        git commit -m "Fix review comments for login feature"
        git push origin feature/<feature-name>
        ```
        
2. **Merge to `main`**:
    
    - Once the PR is approved and all checks pass, the branch can be merged into `main` using GitHub’s **Merge Pull Request** button.
    - Optionally, delete the feature branch after merging.
3. **Pull the Latest Code**:
    
    - After the merge, all developers should pull the updated `main` branch:
        
        ```bash
        git checkout main
        git pull origin main
        ```

---

### **Before Pushing**

1. **Avoid Conflicts**:
    
    - Pull the latest `main` branch into your feature branch before starts working to stay updated and avoid conflicts:
        
        ```bash
        git pull origin main
        ```

2. **Test Locally**:
    
    - Ensure your changes work as expected locally before pushing or creating a pull request.
      

1. **Avoid These**:
    
    - Never push sensitive data (e.g., `.env` files).
    - Avoid committing temporary or debug files (e.g., `.DS_Store`, `__pycache__`).
