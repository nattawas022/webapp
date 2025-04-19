import B from "../components/B"
 
export default function Property() {

    const person = {
        name: "John Doe xxx",
        age: 30,
    }

    return (<div> 

        <h1>Property</h1>
        <div>This is: 
            <A  foo="foo"  
                bar="bar new world"
                person={person}
            /> 
        </div>
        <div>This is: <B /> </div>
    </div>)
}

// functional component
function A({foo, bar, person} : 
        {foo: string, bar: string, 
            person: {name: string, age: number} } )
        {
    return (<>
        A Component  {foo} 
        Component: <C bar={bar} person={person} />
    </>)
}

function C({bar, person}: {bar: string,  
    person: {name: string, age: number} }) {
    return (<><br /><hr />
        C Component: {bar}
        Person: {person.name} {person.age}
        <br /> <hr />
        {JSON.stringify(person)}
        <br />

    </>)
}