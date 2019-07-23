with import <nixpkgs> {};

{ }:

stdenv.mkDerivation rec {
  name = "isentia_test";
  version = "0.0.0";


  buildInputs = [ nodejs-10_x ];
  meta = with stdenv.lib; {
  };
}
