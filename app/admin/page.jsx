// filepath: /Users/muzammilmohammad/Desktop/project1/app/admin/page.jsx
"use client";

import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("employees");

  // Employee state
  const [employees, setEmployees] = useState([]);
  const [employeeName, setEmployeeName] = useState("");
  const [employeeService, setEmployeeService] = useState("");
  const [employeeMobile, setEmployeeMobile] = useState("");
  const [employeePassword, setEmployeePassword] = useState("");

  // Blog state
  const [blogs, setBlogs] = useState([]);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [blogFile, setBlogFile] = useState(null);

  // Service state
  const [services, setServices] = useState([]);
  const [serviceCategory, setServiceCategory] = useState("");
  const [serviceItems, setServiceItems] = useState([]);

  const fetchEmployees = async () => {
    try {
      const res = await fetch("/api/employees");
      if (res.ok) {
        const data = await res.json();
        // If data isn't an array, default to empty array
        setEmployees(Array.isArray(data) ? data : []);
      } else {
        setEmployees([]);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
      setEmployees([]);
    }
  };

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blog");
      if (res.ok) {
        const data = await res.json();
        // Ensure we're setting the blogs array from the response
        setBlogs(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogs([]); // Set empty array on error
    }
  };

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/services");
      if (res.ok) {
        const data = await res.json();
        setServices(data);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchBlogs();
    fetchServices();
  }, []);

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: employeeName,
          service: employeeService,
          mobile: employeeMobile,
          password: employeePassword,
        }),
      });
      if (res.ok) {
        setEmployeeName("");
        setEmployeeService("");
        setEmployeeMobile("");
        setEmployeePassword("");
        fetchEmployees();
      }
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      const res = await fetch(`/api/employees?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchEmployees();
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleAddBlog = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: blogTitle,
          description: blogDescription,
        }),
      });
  
      if (res.ok) {
        setBlogTitle("");
        setBlogDescription("");
        fetchBlogs();
      }
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: serviceCategory,
          items: serviceItems, // e.g., []
        }),
      });
      if (res.ok) {
        setServiceCategory("");
        setServiceItems([]);
        fetchServices();
      }
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-black">Admin Dashboard</h1>

      {/* Navigation Tabs */}
      <div className="w-full grid grid-cols-3 mb-8">
        <button
          className="flex items-center gap-2 px-4 py-2 border rounded"
          onClick={() => setActiveTab("employees")}
        >
          Employees
        </button>
        <button
          className="flex items-center gap-2 px-4 py-2 border rounded"
          onClick={() => setActiveTab("blogs")}
        >
          Blogs
        </button>
        <button
          className="flex items-center gap-2 px-4 py-2 border rounded"
          onClick={() => setActiveTab("services")}
        >
          Services
        </button>
      </div>

      {/* Employees Section */}
      {activeTab === "employees" && (
        <div>
          <h2 className="text-2xl font-semibold">Manage Employees</h2>
          <p>Add or remove employees from the system.</p>
          <form onSubmit={handleAddEmployee} className="space-y-4 mt-4">
            <input
              placeholder="Name"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              className="border p-2 w-full"
            />
            <input
              placeholder="Service/Work"
              value={employeeService}
              onChange={(e) => setEmployeeService(e.target.value)}
              className="border p-2 w-full"
            />
            <input
              placeholder="Mobile Number"
              value={employeeMobile}
              onChange={(e) => setEmployeeMobile(e.target.value)}
              className="border p-2 w-full"
            />
            <input
              type="password"
              placeholder="Account Password"
              value={employeePassword}
              onChange={(e) => setEmployeePassword(e.target.value)}
              className="border p-2 w-full"
            />
            <button type="submit" className="w-full bg-black text-white p-2">
              Add Employee
            </button>
          </form>

          <div className="mt-8 space-y-4">
            {employees.map((employee) => (
              <div
                key={employee._id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div>
                  <p className="font-medium">{employee.name}</p>
                  <p className="text-sm text-gray-600">
                    Employee Number: {employee.employeeId}
                  </p>
                  <p className="text-sm text-gray-600">
                    Service: {employee.service}
                  </p>
                  <p className="text-sm text-gray-600">
                    Mobile: {employee.mobile}
                  </p>
                  <p className="text-sm text-gray-600">
                    Service Email: {employee.serviceEmail}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteEmployee(employee._id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Blogs Section */}
      {activeTab === "blogs" && (
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mt-16">Manage Blogs</h2>
      <p>Add new blog posts to the website.</p>

      <form onSubmit={handleAddBlog} className="space-y-4 mt-4" encType="multipart/form-data">
        <input
          placeholder="Blog Title"
          value={blogTitle}
          onChange={(e) => setBlogTitle(e.target.value)}
          className="border p-2 w-full"
        />
        <textarea
          placeholder="Blog Description"
          value={blogDescription}
          onChange={(e) => setBlogDescription(e.target.value)}
          className="w-full p-2 border rounded-md border-gray-300 min-h-[100px]"
        />

        <button type="submit" className="w-full bg-black text-white p-2">
          Add Blog
        </button>
      </form>

      <div className="mt-8 grid gap-4 grid-cols-1 md:grid-cols-2">
  {Array.isArray(blogs) && blogs.map((blog) => (
    <div key={blog._id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <h3 className="font-medium text-lg">{blog.title}</h3>
      <p className="text-gray-600 mt-2">{blog.description}</p>
      <p className="text-sm text-gray-500 mt-2">
        {new Date(blog.createdAt).toLocaleDateString()}
      </p>
    </div>
  ))}
</div>
    </div>
  )}

      {/* Services Section */}
      {activeTab === "services" && (
        <div className="mt-16">
          <h2 className="text-2xl font-semibold">Manage Services</h2>

          {/* Form to add a new service */}
          <form onSubmit={handleAddService} className="space-y-4 mt-4">
            <input
              placeholder="Service Category"
              value={serviceCategory}
              onChange={(e) => setServiceCategory(e.target.value)}
              className="border p-2 w-full"
            />
            {/* You can add more inputs for items or handle them dynamically */}
            <button type="submit" className="w-full bg-black text-white p-2">
              Add Service
            </button>
          </form>

          {/* Display existing services */}
          <div className="mt-8 grid gap-4 grid-cols-1 md:grid-cols-3">
            {services.map((service) => (
              <div
                key={service._id}
                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-medium text-center mb-2">
                  {service.category}
                </h3>
                {service.items?.map((item) => (
                  <div key={item._id} className="mb-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-32 object-cover rounded-md mb-2"
                    />
                    <p>{item.title}</p>
                    <p>{item.description}</p>
                    <p>
                      Discounted: {item.discountedprice} / Original:{" "}
                      {item.actualprice}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}