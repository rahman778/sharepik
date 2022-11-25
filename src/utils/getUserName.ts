function getUserName(name: string) {
   return name.substring(0, name.indexOf("@"));
}

export default getUserName;
