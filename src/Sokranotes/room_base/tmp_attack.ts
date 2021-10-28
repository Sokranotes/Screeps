export const tmp_attack_work = function(creep: Creep){
    let li = ['616e6d0b97ea7d5db42ac364', '614081fb89c2b92bc5d8fb0c', '616e0a9f3efa916c4444a917', '60e851e11355bb3427f59129', '60e851acb70212468a3d8f82', 
    '60e851af38cd424870154809', '60e89163f37d59c7c3913b10', '60e8915c3597e052baba860c',  
    '60e891523bd3cc1722dc41dd', '60e8914fd6c6514db335116f', '60e8914c0487c775ad8144ce', '60e890be45a2b4d207116bb2', 
    '60e851338f4a09f7f98a0233', '60e8512667103a56494943ef', '60e890954c1e9d49b40cef32', 
    '60e890914cc4c139855824cd']
    for (let i in li){
        let wall: StructureWall = Game.getObjectById(li[i])
        if (wall != undefined){
            if (creep.attack(wall) != OK){
                creep.moveTo(wall)
            }
            break
        }
    }
}