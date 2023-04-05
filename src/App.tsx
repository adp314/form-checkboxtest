import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiArrowUp, HiArrowDown } from "react-icons/hi";

type Subcategory = {
  subjectName: string;
  subjectArr: string[];
};

type Category = {
  categoryName: string;
  id: number;
  subcategories: Subcategory[];
};

type FormData = {
  selectedCategories: string[];
};

const mockupData: Category[] = [
  {
    categoryName: "internal medecine",
    id: 10,
    subcategories: [
      {
        subjectName: "Cardiac",
        subjectArr: ["electrophysiology", "Critical care", "pacemaker"],
      },
      {
        subjectName: "Rheume",
        subjectArr: ["Rheumatology1", "Rheumatology2", "Rheumatology3"],
      },
      {
        subjectName: "Sport",
        subjectArr: ["Sport1", "Sport2", "Sport3"],
      },
    ],
  },
  {
    categoryName: "Neurology",
    id: 35,
    subcategories: [
      {
        subjectName: "Brain",
        subjectArr: ["Hospice1", "Hospice2", "Hospice3"],
      },
      {
        subjectName: "Child",
        subjectArr: ["Neuromuscular1", "Neuromuscular2", "Neuromuscular3"],
      },
      {
        subjectName: "Sleep",
        subjectArr: ["Vascular1", "Vascular2", "Vascular3"],
      },
    ],
  },
];

export default function App() {
  const { register, handleSubmit } = useForm<FormData>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCat, setSelectedCat] = useState<Category | null>(null);
  const [showSubjects, setShowSubjects] = useState<boolean>(false);

  useEffect(() => {
    setCategories(mockupData);
  }, []);

  const onSubmit = (data: FormData) => {
    console.log(data.selectedCategories);
  };

  const handleCategoryChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    category: Category
  ) => {
    const checked = e.target.checked;
    setSelectedCat(checked ? category : null);
    setSelectedCategories((prevSelectedCategories) => {
      if (checked) {
        return [...prevSelectedCategories, category.categoryName];
      } else {
        return prevSelectedCategories.filter(
          (prevCategory) => prevCategory !== category.categoryName
        );
      }
    });
  };

  const handleSubcategoryChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    subcategory: Subcategory
  ) => {
    const checked = e.target.checked;
    setSelectedCat(
      checked ? { ...selectedCat!, subcategories: [subcategory] } : null
    );
    setShowSubjects(checked);
    setSelectedCategories((prevSelectedCategories) => {
      if (checked) {
        return [...prevSelectedCategories, subcategory.subjectName];
      } else {
        return prevSelectedCategories.filter(
          (prevSubcategory) => prevSubcategory !== subcategory.subjectName
        );
      }
    });
  };

  return (
    <main className="bg-gray-400 w-screen h-screen flex justify-center items-center">
      <div className="bg-blue-400 w-96 h-max rounded-lg">
        <h1 className="text-lg text-white m-4 font-bold">
          Training MEDUS Form :
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <legend className="text-white mb-4">Categories:</legend>
            {categories.map((category) => (
              <div key={category.id}>
                <label className="bg-white px-3 py-2 rounded-2xl flex justify-between items-center gap-4 w-max">
                  <input
                    type="checkbox"
                    className="mr-2"
                    name={`selectedCategories.${category.categoryName}`}
                    onChange={(e) => handleCategoryChange(e, category)}
                    value={category.categoryName}
                    ref={void register}
                  />
                  <span>{category.categoryName}</span>
                  {selectedCat?.id === category.id ? (
                    <HiArrowUp
                      className="text-dark"
                      onClick={() => setSelectedCat(null)}
                    />
                  ) : (
                    <HiArrowDown
                      className="text-dark"
                      onClick={() => setSelectedCat(category)}
                    />
                  )}
                </label>
                {selectedCat && selectedCat.id === category.id && (
                  <fieldset id="subcategories">
                    {category.subcategories.map((subcategory) => (
                      <label
                        key={subcategory.subjectName}
                        className="bg-white px-3 py-2 rounded-2xl flex justify-between items-center gap-4 w-max ml-8"
                      >
                        <input
                          type="checkbox"
                          name={`selectedCategories.${category.categoryName}`}
                          value={subcategory.subjectName}
                          onChange={(e) =>
                            handleSubcategoryChange(e, subcategory)
                          }
                          ref={void register}
                        />
                        <span>{subcategory.subjectName}</span>
                        {showSubjects &&
                        selectedCat?.subcategories?.[0]?.subjectName ===
                          subcategory.subjectName ? (
                          <HiArrowUp
                            className="text-dark"
                            onClick={() => setShowSubjects(false)}
                          />
                        ) : (
                          <HiArrowDown
                            className="text-dark"
                            onClick={() => setShowSubjects(true)}
                          />
                        )}
                      </label>
                    ))}
                    {showSubjects &&
                      selectedCat?.subcategories?.[0]?.subjectArr && (
                        <div className="ml-8 mt-2">
                          {selectedCat.subcategories[0].subjectArr.map(
                            (subject) => (
                              <div key={subject}>{subject}</div>
                            )
                          )}
                        </div>
                      )}
                  </fieldset>
                )}
              </div>
            ))}
          </fieldset>
        </form>
      </div>
      <div className="bg-blue-700 w-96 h-48 ml-8">
        <h1 className="text-white p-5">subjects selected :</h1>
        <span className="text-white">{selectedCategories}</span>
      </div>
    </main>
  );
}
