import { useState, useEffect } from "react"

const MiApi = ()=> {
    const [allData, setAllData] = useState([])
    const [data, setData] = useState([])
    const [value, setValue] = useState("")
    const [order, setOrder] = useState("asc")

    useEffect(()=> {
        getData()
    }, [])

    useEffect(()=> {
        filterData()
    }, [value])

    useEffect(()=> {
        const sorted = sortData(data)
        setData(sorted)
    }, [order])
    
    const getData = ()=> {
        const url = 'https://api.gael.cloud/general/public/sismos'
        fetch(url)
            .then((res)=> res.json())
            .then((json)=> {

                const sorted = sortData(json)

                setAllData(sorted)
                setData(sorted) 
            })
            .catch((e)=> console.log(e))
    }

    const filterData = ()=> {
        const search = value.toLowerCase()
        const filtered = allData.filter((could)=> {
            const refGeografica = could.RefGeografica.toLowerCase()

            return refGeografica.includes(search)
        })

        const sorted = sortData(filtered)
        setData(sorted)
    }

    const sortData = (data)=> { 
        const sortedData = [...data]

        if(order === 'asc') {
            sortedData.sort((a, b)=> a.Magnitud.localeCompare(b.Magnitud))
        } else {
            sortedData.sort((a, b)=> b.Magnitud.localeCompare(a.Magnitud))
        }

        return sortedData
    }
 
    return (
        <main>
            <h2>Sismos en Chile</h2>
            <div className="inputs">
                <input type="text" placeholder="Buscar por referencia geográfica" onChange={(e)=> setValue(e.target.value)}/>
                <select onChange={(e)=> setOrder(e.target.value)}>
                    <option value="asc">Orden Ascendente</option>
                    <option value="des">Orden Descendente</option>
                </select>
            </div>

            <table>
            <thead>
                <tr>
                    <th>N°</th>
                    <th>Fecha y Hora</th>
                    <th>Profundidad</th>
                    <th>Magnitud</th>
                    <th>Referencia Geográfica</th>
                </tr>
            </thead> 
            <tbody>
               {
                data.map((could, index)=> {
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{could.Fecha}</td>
                            <td>{could.Profundidad}</td>
                            <td>{could.Magnitud}</td>
                            <td>{could.RefGeografica}</td>
                        </tr>
                    )
                })
               }
            </tbody>
           </table>
        </main>
    )
}

export default MiApi