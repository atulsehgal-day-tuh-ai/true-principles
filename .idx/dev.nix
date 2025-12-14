# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  
  # 1. Channels & Packages
  channel = "stable-23.11"; 
  packages = [
    pkgs.nodejs_20
    pkgs.python311
    pkgs.python311Packages.pip
    # Add other packages here if needed
  ];

  # 2. Enable Docker (ADD THIS HERE)
  services.docker.enable = true;

  # 3. IDX Specific Config
  idx = {
    
    # Extensions
    extensions = [
      # "supabase.supabase-vscode" 
    ];

    # Previews (Must be inside 'idx')
    previews = {
      enable = true;
      previews = {
        web = {
          command = [
            "npm"
            "run"
            "dev"
            "--prefix"
            "frontend"
            "--"
            "--port"
            "$PORT"
            "--hostname"
            "0.0.0.0"
          ];
          manager = "web";
        };
        api = {
          command = [
            "pip"
            "install"
            "-r"
            "api/requirements.txt"
            "&&"
            "uvicorn"
            "api.main:app"
            "--host"
            "0.0.0.0"
            "--port"
            "$PORT"
          ];
          manager = "web";
        };
      };
    };
    
    # Workspace Lifecycle Hooks
    workspace = {
      # Runs when you create a workspace
      onCreate = {
        npm-install = "npm install --prefix frontend";
        pip-install = "pip install -r api/requirements.txt";
      };
      # Runs every time you start the workspace
      onStart = {
        # You can add start commands here
      };
    };
  };
}