echo "Ensure we exit on error"
set -e

source setup/teardown_shared.sh

echo "Uninstalling cocoapods version $COCOAPODS_VERSION"
gem uninstall cocoapods -v $COCOAPODS_VERSION

echo "Removing all modules, plugins and platforms to make a fresh start"
rm -rf node_modules
rm -rf plugins
rm -rf platforms
