const maximizeNum = (name, num) =>{
    if(name.length > num) return (name.substring(0, num) + "...")
    return name
}
export default maximizeNum