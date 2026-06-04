function HealthTips() {

  const tips = [

    "Drink at least 2–3 litres of water daily",

    "Exercise for 30 minutes every day",

    "Get 7–8 hours of sleep",

    "Eat more fruits and vegetables",

    "Avoid excessive sugar and processed foods"

  ];

  return (

    <div>

      <h1 className="page-title">
        ❤️ Health Tips
      </h1>

      <div className="grid grid-3">

        {tips.map((tip,index)=>(

          <div
            key={index}
            className="card"
          >

            <h3>
              Tip #{index + 1}
            </h3>

            <p
              style={{
                marginTop:"10px"
              }}
            >
              {tip}
            </p>

          </div>

        ))}

      </div>

    </div>

  );
}

export default HealthTips;