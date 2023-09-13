import { useContext } from 'react'
import { Pagination } from '../../components/Pagination'
import { PokemonList } from '../../components/PokemonList'
import { PokemonContext } from '../../context/pokemonContext'
import { usePagination } from '../../hooks/usePagination'

import { Navbar } from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'

export const Home = () => {
    const { pokemonsFiltered } = useContext(PokemonContext)
    const { page, nextPage, previousPage } = usePagination()

    let perPage = 12

    return (
        <>
            <div className="navbar-style">
                <Navbar />
            </div>
            <div>
                <div className="flex justify-evenly gap-10">
                    <div>
                        <Sidebar />
                    </div>
                    <div className="flex justify-evenly flex-wrap gap-20">
                        <div>
                            <PokemonList
                                page={page}
                                perPage={perPage}
                                pokemonsUrls={pokemonsFiltered}
                            />
                            <Pagination
                                page={page}
                                perPage={perPage}
                                nextPage={nextPage}
                                previousPage={previousPage}
                                maxItems={pokemonsFiltered?.length!}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
