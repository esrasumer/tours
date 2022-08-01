import React, { useEffect, useState } from 'react';
import Loading from './components/Loading'
import Tours from './components/Tours'

const url = 'https://course-api.com/react-tours-project'

function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id)
    setTours(newTours);
  }

  const fetchTours = async () => {   //datayı çekmeye başla
    setLoading(true);   //loading başlasın

    try {
      const response = await fetch(url);  //fetch native bir fonksiyon. yani js in özünde var. bunun paket hali axios
      const tours = await response.json(); // response ı array object e çevirioruz. Elimizde array var şuan.
      setTours(tours);   //gelen datayı useState e koyduk. Artık datayı istediğimiz yerde kullanabiliriz.
      setLoading(false);   //Loading e ihtiyacımız kalmadı. Loading false 
    } catch (error) {   //hata varsa burası çalışsın.
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {  //component mount olduğunda burası çalışır.
    fetchTours();   //bu fonksiyon sadece 1 defa çalışır. bir daha çağrılmaz.
  }, []);  //dependency boş. Çünkü sadece ilk açıldığında çalışsın istiyoruz.


  return (
    <main>
      {loading &&
        <Loading />
      }
      {tours.length === 0 && !loading &&
        <div className="title">
          <h2>No Tours Left </h2>
          <button className='btn' onClick={fetchTours}>Refresh</button>
        </div>
      }
      {tours.length > 0 && <Tours tours={tours} removeTour={removeTour} />}
    </main>
  );
}

export default App;
