import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { PokemonContext } from '../../context/pokemonContext'
import { usePagination } from '../../hooks/usePagination'
import { PokeType } from '../../interfaces/types'

export const Sidebar = () => {
    const navigate = useNavigate()
    const { types, changeTypeSelected } = useContext(PokemonContext)
    const { changePage } = usePagination()

    const onChangeType = (type: PokeType) => {
        changePage(1)
        navigate('/?page=1')
        changeTypeSelected(type)
    }

    return (
        <>
            <div className="min-h-screen flex flex-row bg-gray-100">
                <div className="flex flex-col w-56 bg-base-100 overflow-hidden">
                    <ul className="flex flex-col py-4">
                        {
                            <div>
                                {types.map((type: PokeType) => (
                                    <li key={type.name} onClick={() => onChangeType(type)}>
                                        <a className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-white-500 hover:text-white-800">
                                            <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                                                <i className="bx bx-log-out"></i>
                                            </span>
                                            <span className="text-sm font-medium">{type.name}</span>
                                        </a>
                                    </li>
                                ))}
                            </div>
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Sidebar
